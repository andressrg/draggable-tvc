import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'asr-draggable-tvc-base',

  registerWithParent: function() {
    this.get('parentView').registerMainCell(this);
  }.on('didInsertElement'),

  updateWidth: function() {
    this.$().width(this.get('parentView.baseWidth'));
  }.observes('parentView.baseWidth').on('didInsertElement'),

});
