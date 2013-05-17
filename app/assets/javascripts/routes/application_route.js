App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Embercast.find();
  }
});
