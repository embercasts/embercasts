App.TrackedLinkView = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['href', 'target'],
  click: function() {
    var eventName = this.get('eventName'),
        data = { videoId: this.get('context.slug') };

    // Without this, Chrome inspector reports failures, likely because
    // it thinks that the link to the video is being 'followed'.
    Ember.run.later(this, function() {
      this.get('controller.analyticsController').report('Downloads', eventName, data);
    }, 100);
  }
});
