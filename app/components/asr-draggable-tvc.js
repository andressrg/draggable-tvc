import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'asr-draggable-tvc',

  cellOffset: 0,
  baseWidth: null,

  // initial drag x or y
  isDraggingInY: false,
  isDraggingInX: false,

  // 0: main, -1: left, -2: max left, 1: right, 2: max right
  currentDragState: 0,

  registerMainCell: function(mainCell) {
    this.set('mainCell', mainCell);
  },
  registerLeftCell: function(leftCell) {
    this.set('leftCell', leftCell);
  },
  registerRightCell: function(rightCell) {
    this.set('rightCell', rightCell);
  },
  registerMaxLeftCell: function(maxLeftCell) {
    this.set('maxLeftCell', maxLeftCell);
  },
  registerMaxRightCell: function(maxRightCell) {
    this.set('maxRightCell', maxRightCell);
  },

  initializeWrapperWidth: function() {
    var initialWidth = this.$().width();
    this.set('baseWidth', initialWidth);
  }.on('didInsertElement'),

  updateWidth: function() {
    var baseWidth = this.get('baseWidth');
    var totalWidth = 0;

    if (this.get('mainCell')) { totalWidth += baseWidth; }
    if (this.get('leftCell')) { totalWidth += baseWidth; }
    if (this.get('rightCell')) { totalWidth += baseWidth; }

    this.$().width(totalWidth);
    this.updateCellOffset();
  }.observes('baseWidth', 'mainCell', 'leftCell', 'rightCell', 'maxLeftCell', 'maxRightCell'),

  updateCellOffset: function() {
    var baseWidth = this.get('leftCell') ? this.get('baseWidth') : 0;
    var cellOffset = this.get('cellOffset');
    var totalOffset = cellOffset - baseWidth;
    this.$().css('transform', 'translateX(' + totalOffset + 'px)');
  }.observes('cellOffset', 'baseWidth'),

  gestures: {
    drag: function(event) {
      var deltaX = event.gesture.deltaX;
      var baseWidth = this.get('baseWidth');

      var anyLeftCellAndLeftDragging = deltaX > 0 && !(this.get('leftCell') || this.get('maxLeftCell'));
      var anyRightCellAndRightDragging = deltaX < 0 && !(this.get('rightCell') || this.get('maxRightCell'));
      if (anyLeftCellAndLeftDragging || anyRightCellAndRightDragging) {
        this.set('cellOffset', 0);
        return true;
      }

      if (!this.get('isDraggingInX') && !this.get('isDraggingInY')) {
        if (Math.abs(event.gesture.deltaX) > 5 || Math.abs(event.gesture.deltaY) > 5) {
          if (Math.abs(event.gesture.deltaX) < Math.abs(event.gesture.deltaY)) {
            // began dragging vertically
            this.set('isDraggingInY', true);
            this.set('isDraggingInX', false);
            this.set('cellOffset', 0);
            return false;
          } else {
            // began dragging horizontally
            this.set('isDraggingInY', false);
            this.set('isDraggingInX', true);
          }
        }
      }

      if (this.get('isDraggingInY')) {
        return false;
      }

      // is dragging horizontally
      event.gesture.preventDefault();

      if (Math.abs(deltaX) > baseWidth * 0.5) {
        if (deltaX > 0 && this.get('maxLeftCell')) {
          this.set('currentDragState', -2);
        } else if (deltaX < 0 && this.get('maxRightCell')) {
          this.set('currentDragState', 2);
        }
      } else if (Math.abs(deltaX) > baseWidth * 0.2) {
        if (deltaX > 0 && this.get('leftCell')) {
          this.set('currentDragState', -1);
        } else if (deltaX < 0 && this.get('rightCell')) {
          this.set('currentDragState', 1);
        }
      } else {
        this.set('currentDragState', 0);
      }

      this.$().removeClass('animate');
      this.set('cellOffset', deltaX);
      return false;
    },
    dragend: function() {
      this.$().addClass('animate');
      this.set('cellOffset', 0);

      switch (this.get('currentDragState')) {
        case 1:
          console.log('Right! ' + this.get('model.content'));
          break;
        case 2:
          console.log('Max right! ' + this.get('model.content'));
          break;
        case -1:
          console.log('Left! ' + this.get('model.content'));
          break;
        case -2:
          console.log('Max left! ' + this.get('model.content'));
          break;
        default:
          break;
      }

      this.set('currentDragState', 0);
      return false;
    },

  },

});
