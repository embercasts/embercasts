App.BetaRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('index');
  }
});