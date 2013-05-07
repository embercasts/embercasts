App.EmbercastsCollectionView = Ember.CollectionView.extend(
  Ember.ViewTargetActionSupport, {

  itemViewClass: App.EmbercastView,
  init: function() {
    this._super();

    // Controller needs to be aware of this view so that it
    // can tell it to scroll to a specific Embercast
    this.set('controller.collectionView', this);
  },

  didInsertElement: function() {
    // Listen for scroll events
    // on window so that the URL can update to currently
    // scrolled-to Embercast.
    var self = this, $window = Ember.$(window);
    self._scrollListener = function(e) {

      if (self._debouncedScrollTimer) {
        Ember.run.cancel(self._debouncedScrollTimer);
        self._debouncedScrollTimer = null;
      }
      self._debouncedScrollTimer = Ember.run.later(self, '_scrollChanged', 300);
    };
    $window.scroll(self._scrollListener);

    // Force a single fire.
    self._scrollListener();
  },

  _scrollChanged: function() {
    self._debouncedScrollTimer = null;

    var childViews = this.get('childViews'),
        len = childViews.length,
        currentScroll = Ember.$(window).scrollTop(),
        i, childView, closestChildView,
        closestDistance = Infinity,
        distance;

    if (!len) { return; }

    for (i = 0; i < len; ++i) {
      childView = childViews[i];
      distance = Math.abs(childView.$().offset().top - currentScroll);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestChildView = childView;
      }
    }

    this.triggerAction({
      action: 'setCastURL',
      actionContext: closestChildView.get('content')
    });
  },

  // Attempt to scroll to the provided cast, returns true
  // if successful, false if cast is not in the CollectionView.
  scrollToCast: function(cast) {
    var index = this.get('controller.content').indexOf(cast);
    if (index === -1) { return false; }

    var childView = this.get('childViews').objectAt(index);
    Ember.$(window).scrollTo(childView.$(), 300);
    return true;
  },

  willDestroyElement: function() {
    Ember.$(window).unbind('scroll', this._scrollListener);
  },

  willDestroy: function() {
    this.set('controller.collectionView', null);
    this._super();
  }
});
