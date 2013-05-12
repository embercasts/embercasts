App.BetaRoute = Ember.Route.extend({
  model: function(params) {
    var self = this,
        token = params.token || localStorage.betaToken,
        promise = Ember.Deferred.create();

    $.getJSON("http://api.embercasts.com/beta/" + token).then(function() {
      localStorage.betaToken = token;
      promise.resolve();

      // h4x
      setTimeout(function() {
        self.transitionTo('index');
      });
    }, function() {
      alert("Invalid beta token!");
      promise.reject();
    });

    return promise;
  }
});