import AsrDraggableTvcBase from "draggable-tvc/components/asr-draggable-tvc-base";

export default AsrDraggableTvcBase.extend({

  tagName: 'asr-draggable-tvc-left',

  registerWithParent: function() {
    this.get('parentView').registerLeftCell(this);
  }.on('didInsertElement'),

  updateState: function() {
    var state = this.get('parentView.currentDragState');
    var $this = this.$();

    if (state === -1) {
      $this.css('visibility', 'visible');
      $this.css('display', 'inline-block');
    } else if (state === -2) {
      $this.css('display', 'none');
    } else {
      $this.css('visibility', 'hidden');
      $this.css('display', 'inline-block');
    }
  }.observes('parentView.currentDragState').on('didInsertElement'),

});
