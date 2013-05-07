App.EmbercastsRoute = Ember.Route.extend({
  model: function() {
    return App.Embercast.find();
  }
});


