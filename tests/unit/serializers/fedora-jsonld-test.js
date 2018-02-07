import { moduleForModel, test } from 'ember-qunit';

// Need to load serializer in strange way.
moduleForModel('user', 'Unit | Serializer | fedora jsonld', {
  needs: ['serializer:fedora-jsonld']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
