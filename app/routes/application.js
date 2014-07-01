import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
    var items = [];
    for (var i = 0; i < 100; i++) {
      items.push({
        content: "Cell " + i
      });
    }
    return items;
  },

  actions: {
    delete: function(cell) {
      console.log('delete' + cell.content);
    },
    archive: function(cell) {
      console.log('archive' + cell.content);
    },
    pospone: function(cell) {
      console.log('pospone' + cell.content);
    },
    addToList: function(cell) {
      console.log('addToList' + cell.content);
    },
  },

});
