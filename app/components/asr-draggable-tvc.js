import Ember from "ember";

export default Ember.Component.extend({

  tagName: 'asr-draggable-tvc',

  cellOffset: 0,
  baseWidth: null,

  initializeWrapperWidth: function() {
    var initialWidth = this.$().width();

    this.set('baseWidth', initialWidth);

    this.$('.asr-draggable-tvc-wrapper').width(initialWidth * 3);

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
    this.$('.asr-draggable-tvc-wrapper').css('transform', 'translateX(' + totalOffset + 'px)');
  }.observes('cellOffset', 'baseWidth'),

  gestures: {
    drag: function(event) {
      var deltaX = event.gesture.deltaX;

      // event.gesture.preventDefault();
      if (Math.abs(event.gesture.deltaX) < Math.abs(event.gesture.deltaY)) {
        // event.gesture.preventDefault();
        return false;
      }
      event.gesture.preventDefault();

      if (Math.abs(deltaX) > this.get('baseWidth') * 0.5) {
        this.$('asr-draggable-tvc-left').css('background', 'yellow');
      }

      this.$('.asr-draggable-tvc-wrapper').removeClass('animate');
      this.set('cellOffset', deltaX);
      return false;
    },
    dragend: function() {
      this.$('.asr-draggable-tvc-wrapper').addClass('animate');
      this.set('cellOffset', 0);
      return false;
    },

  },

});
