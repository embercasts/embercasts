App.EmbercastsCollectionView = Ember.CollectionView.extend({
  itemViewClass: App.EmbercastView,
  init: function() {
    this._super();

    // Controller needs to be aware of this view so that it
    // can tell it to scroll to a specific Embercast
    this.set('controller.collectionView', this);
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

  willDestroy: function() {
    this.set('controller.collectionView', null);
    this._super();
  }
});
