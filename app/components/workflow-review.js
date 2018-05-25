import Component from '@ember/component';
import _ from 'lodash';

export default Component.extend({
  didRender() {
    // // TODO:  add validation step here that checks the model each rerender
    // this.set('isValidated', false)
  },
  externalSubmission: Ember.computed('metadataBlobNoKeys', function () { // eslint-disable-line
    if (this.get('metadataBlobNoKeys').Submission) {
      return true;
    }
    return false;
  }),
  parsedFiles: Ember.computed('filesTemp', function () {
    return JSON.parse(this.get('filesTemp'));
  }),
  metadata: Ember.computed('model.newSubmission.metadata', function () { // eslint-disable-line
    return JSON.parse(this.get('model.newSubmission.metadata'));
  }),
  metadataBlobNoKeys: Ember.computed('model.newSubmission.metadata', function () { // eslint-disable-line
    let metadataBlobNoKeys = [];
    JSON.parse(this.get('model.newSubmission.metadata')).forEach((ele) => {
      for (var key in ele.data) {
        if (ele.data.hasOwnProperty(key)) {
          let strippedData;
          strippedData = ele.data[key];

          if (key === 'authors') {
            if (metadataBlobNoKeys['author(s)']) {
              metadataBlobNoKeys['author(s)'] = _.uniqBy(metadataBlobNoKeys['author(s)'].concat(strippedData), 'author');
            } else {
              metadataBlobNoKeys['author(s)'] = strippedData;
            }
          } else if (key === 'container-title') {
            metadataBlobNoKeys['journal-title'] = strippedData;
          } else {
            metadataBlobNoKeys[key] = strippedData;
          }
        }
      }
    });
    for (var key in metadataBlobNoKeys) {
      if (metadataBlobNoKeys.hasOwnProperty(key)) {
        metadataBlobNoKeys[_.capitalize(key)] = metadataBlobNoKeys[key];
        delete metadataBlobNoKeys[key];
      }
    }
    return metadataBlobNoKeys;
  }),
  hasVisitedEric: false,
  mustVisitEric: Ember.computed('model.newSubmission.metadata', function () {
    return JSON.parse(this.get('model.newSubmission.metadata')).map(m => m.id).includes('eric');
  }),
  disableSubmit: Ember.computed('mustVisitEric', 'hasVisitedEric', function () {
    return this.get('mustVisitEric') && !this.get('hasVisitedEric');
  }),
  actions: {
    clickEric() {
      this.set('hasVisitedEric', true);
      $('#externalSubmission').modal('hide');
    },
    submit() {
      // In case a crafty user edits the page HTML, don't submit when not allowed
      if (this.get('disableSubmit')) {
        return;
      }
      this.sendAction('submit');
    },
    back() {
      this.sendAction('back');
    },
    checkValidate() {
      this.sendAction('validate');
    },
  }
});
