App.EmbercastView = Ember.View.extend({
  tagName: 'article',
  templateName: 'embercast',
  didInsertElement: function() {
    // sublime.load();
    // if (sublime.prepare) { // wtf sublime video?!
    //   sublime.prepare(this.get('elementId'));
    // }
  },

  share: function() {
    console.log(this.get('showLinks'));
    return this.toggleProperty('showLinks');
  }
});
