App.EpisodeRoute = Ember.Route.extend({
  model: function(params) {
    return App.Embercast.find(params.embercast_id);
  },
  serialize: function(model) {
    return { embercast_id: model.get('slug') };
  }
});
