App.EmbercastView = Ember.View.extend({
  tagName: 'article',
  templateName: 'embercast',
  didInsertElement: function() {
    sublime.load();
    if (sublime.prepare) { // wtf sublime video?!
      sublime.prepare(this.get('context.youtube_id'));
    }
  }
});
