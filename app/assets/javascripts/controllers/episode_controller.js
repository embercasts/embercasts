App.EpisodeController = Ember.ObjectController.extend({
  needs: ['analytics'],
  analyticsController: Ember.computed.alias('controllers.analytics'),
});
