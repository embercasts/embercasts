App.NotFoundRoute = Ember.Route.extend({
  model: function(params) {
    return params.path;
  }
});
