App.EmbercastsIndexRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('embercastsIndex').set('model', App.Embercast.find());
  }
});

