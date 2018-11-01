import { moduleForComponent, test, setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module } from 'qunit';
import { render } from '@ember/test-helpers';


module('Integration | Component | workflow policies', (hooks) => {
  setupRenderingTest(hooks);
  test('it renders', function (assert) {
    let model = {};

    // TODO: add actual tests here
    model.newSubmission = Ember.Object.create({
      repositories: [],
      grants: []
    });
    model.policies = [];

    this.set('model', model);

    render(hbs`{{workflow-policies model=model}}`);
    assert.ok(true);
  });
});
