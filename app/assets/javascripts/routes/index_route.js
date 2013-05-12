App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('application');
  },

  // events: {
  //   routeTo: function(transitionEvent) {

  //     // Intercept transitions to individual embercasts so that if
  //     // they're in the visible CollectionView of Embercasts, we
  //     // just scroll to it rather than transitioning to embercasts.show.
  //     if (transitionEvent.destinationRouteName === 'embercast') {

  //       var cast = transitionEvent.contexts[0];
  //       if (this.controller.scrollToCast(cast)) {
  //         this.events.setCastURL.call(this, cast);
  //         return;
  //       }
  //     }

  //     // Bubble the event to default routeTo handler on ApplicationRoute.
  //     return true;
  //   },

  //   setCastURL: function(cast) {
  //     var url = this.router.generate.call(this.router, 'embercast', cast).slice(1);
  //     this.router.get('location').setURL(url);
  //   }
  // }
});
