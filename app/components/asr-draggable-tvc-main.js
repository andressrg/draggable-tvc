import AsrDraggableTvcBase from "draggable-tvc/components/asr-draggable-tvc-base";

export default AsrDraggableTvcBase.extend({

  tagName: 'asr-draggable-tvc-main',

  registerWithParent: function() {
    this.get('parentView').registerMainCell(this);
  }.on('didInsertElement'),

});
