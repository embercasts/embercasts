App.EmbercastItemView = Ember.View.extend({
  didInsertElement: function() {
    sublime.load();
    if (sublime.prepare) { // wtf sublime video?!
      sublime.prepare(this.get('context.youtube_id'));
    }
  }
});
