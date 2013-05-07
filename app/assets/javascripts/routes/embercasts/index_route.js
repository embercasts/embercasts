App.EmbercastsIndexRoute = Ember.Route.extend({
  model: function() {
    // The EmbercastsIndex controller's content is the same
    // as the parent EmbercastRoute content.
    return this.modelFor('embercasts');
  },
  events: {
    routeTo: function(transitionEvent) {

      // Intercept transitions to individual embercasts so that if
      // they're in the visible CollectionView of Embercasts, we
      // just scroll to it rather than transitioning to embercasts.show.
      if (transitionEvent.destinationRouteName === 'embercasts.show') {

        if (this.controller.scrollToCast(transitionEvent.contexts[0])) {

          // Change URL without firing default handleURL behavior.
          // TODO: Ember.js PR to make this process simpler?
          var url = this.router.generate.apply(this.router, transitionEvent.transitionToArgs()).slice(1),
              loc = this.router.get('location');
          loc.set('lastSetURL', url);
          loc.setURL(url);
          return;
        }
      }

      // Bubble the event to default routeTo handler on ApplicationRoute.
      return true;
    }
  }
});

