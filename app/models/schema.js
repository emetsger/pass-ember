import DS from 'ember-data';

export default DS.Model.extend({

  schemaKey: DS.attr('string'),
  schemaUri: DS.attr('string')

});
