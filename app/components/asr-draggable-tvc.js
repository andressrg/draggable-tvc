import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'asr-draggable-tvc',

  cellOffset: 0,
  baseWidth: null,

  // initial drag x or y
  isDraggingInY: false,
  isDraggingInX: false,

  initializeWrapperWidth: function() {
    var initialWidth = this.$().width();

    this.set('baseWidth', initialWidth);

    this.$().width(initialWidth * 3);

    this.$('asr-draggable-tvc-left').width(initialWidth);
    this.$('asr-draggable-tvc-main').width(initialWidth);
    this.$('asr-draggable-tvc-right').width(initialWidth);

    var baseHeight = this.$('asr-draggable-tvc-main').height();
    this.$('asr-draggable-tvc-left').height(baseHeight);
    this.$('asr-draggable-tvc-right').height(baseHeight);

  }.on('didInsertElement'),

  updateCellOffset: function() {
    var baseWidth = this.get('baseWidth');
    var cellOffset = this.get('cellOffset');
    var totalOffset = cellOffset - baseWidth;
    this.$().css('transform', 'translateX(' + totalOffset + 'px)');
  }.observes('cellOffset', 'baseWidth'),

  gestures: {
    drag: function(event) {
      var deltaX = event.gesture.deltaX;

      if (!this.get('isDraggingInX') && !this.get('isDraggingInY')) {
        if (Math.abs(event.gesture.deltaX) < Math.abs(event.gesture.deltaY)) {
          // began dragging vertically
          this.set('isDraggingInY', true);
          this.set('isDraggingInX', false);
          return false;
        } else {
          // began dragging horizontally
          this.set('isDraggingInY', false);
          this.set('isDraggingInX', true);
        }
      }

      if (this.get('isDraggingInY')) {
        return false;
      }

      // is dragging horizontally
      event.gesture.preventDefault();

      if (Math.abs(deltaX) > this.get('baseWidth') * 0.5) {
        this.$('asr-draggable-tvc-left').css('background', 'yellow');
      }

      this.$().removeClass('animate');
      this.set('cellOffset', deltaX);
      return false;
    },
    dragend: function() {
      this.$().addClass('animate');
      this.set('cellOffset', 0);

      // reset initial drag x or y
      this.set('isDraggingInY', false);
      this.set('isDraggingInX', false);

      return false;
    },

  },

});
