App.EmbercastsShowRoute = Ember.Route.extend({
  model: function(params) {
    return App.Embercast.find(params.embercast_id);
  }
});
