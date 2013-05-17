App.EpisodeView = Ember.View.extend({
  tagName: 'article',
  templateName: 'episode',
  click: function(event) {
    var $clickedElement = Ember.$(event.target),
        gaEvent = $clickedElement.data('ga-event');

    if (gaEvent) {
      var data = { videoId: this.get('context.slug') };
      this.get('controller.analyticsController').report('Downloads', gaEvent, data);
    }
  }
});
