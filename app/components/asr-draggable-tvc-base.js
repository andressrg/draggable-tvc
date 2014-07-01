import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'asr-draggable-tvc-base',

  registerWithParent: function() {
    this.get('parentView').registerMainCell(this);
  }.on('didInsertElement'),

  updateWidth: function() {
    var $this = this.$();
    $this.width(this.get('parentView.baseWidth'));
  }.observes('parentView.baseWidth').on('didInsertElement'),

  updateHeight: function() {
    var $this = this.$();
    $this.height(this.get('parentView.baseHeight'));
  }.observes('parentView.baseHeight').on('didInsertElement'),

});
