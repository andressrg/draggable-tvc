import AsrDraggableTvcBase from "draggable-tvc/components/asr-draggable-tvc-base";

export default AsrDraggableTvcBase.extend({

  tagName: 'asr-draggable-tvc-max-right',

  registerWithParent: function() {
    this.get('parentView').registerMaxRightCell(this);
  }.on('didInsertElement'),

  updateState: function() {
    var state = this.get('parentView.currentDragState');
    var $this = this.$();

    if (state === 2) {
      $this.css('visibility', 'visible');
      $this.css('display', 'inline-block');
    } else {
      $this.css('display', 'none');
    }
  }.observes('parentView.currentDragState').on('didInsertElement'),

});
