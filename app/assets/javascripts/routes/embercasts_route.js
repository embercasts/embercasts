App.EmbercastsRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('embercasts').set('model', App.Embercast.find());
  }
});
