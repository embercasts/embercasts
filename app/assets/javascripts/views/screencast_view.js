App.ScreencastView = Ember.View.extend({
  didInsertElement: function() {
    sublime.load();
  }
});