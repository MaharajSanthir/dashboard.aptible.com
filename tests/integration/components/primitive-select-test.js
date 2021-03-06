import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ultimate-select (primitive)', {
  integration: true
});

test('basic attributes are set', function(assert) {
  this.render(hbs('{{ultimate-select name="foo"}}'));

  let select = this.$('select');

  assert.equal(select.prop('name'), 'foo', 'provided name was used');
  assert.ok(select.hasClass('form-control'));
});

test('if prompt was supplied it is displayed', function(assert) {
  this.render(hbs('{{ultimate-select prompt="Foo"}}'));

  let prompt = this.$('option:contains("Foo")');

  assert.equal(prompt.length, 1, 'prompt was found');
  assert.ok(prompt.prop('disabled'), 'prompt is disabled');
});

test('if no prompt was supplied it is not displayed', function(assert) {
  this.render(hbs('{{ultimate-select}}'));

  assert.equal(this.$('option').length, 0, 'prompt was not found');
});

test('provided items are displayed as options', function(assert) {
  this.set('listing', Ember.A(['one', 'two', '3', '4']));

  this.render(hbs('{{ultimate-select items=listing}}'));

  let options = this.$('option');
  assert.equal(options.length, 4);
  assert.equal(options.text().trim(), 'onetwo34');
});

test('provided selected item is selected', function(assert) {
  this.set('listing', Ember.A(['one', 'two', '3', '4']));
  this.set('selectedItem', 'two');

  this.render(hbs('{{ultimate-select selected=selectedItem items=listing}}'));

  let selectedOption = this.$('option:selected');
  assert.equal(selectedOption.length, 1, 'selected option found');
  assert.equal(selectedOption.text().trim(), 'two', 'correct option is selected');
});

test('when changed fires update action with new value', function(assert) {
  assert.expect(1);

  this.on('checkValue', function(newValue) {
    assert.equal(newValue, 'two');
  });

  this.set('listing', Ember.A(['one', 'two', '3', '4']));

  this.render(hbs('{{ultimate-select update=(action "checkValue") items=listing}}'));

  let select = this.$('select');
  Ember.run(function() {
    select.val('two');
    select.trigger('change');
  });
});
