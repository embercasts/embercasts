App.EmbercastsIndexController = Ember.ArrayController.extend({

  // When this controller drives a CollectionView, its itemController's
  // will be an non-singleton EmbercastController.
  itemController: 'embercast',

  scrollToCast: function(cast) {
    return this.collectionView.scrollToCast(cast);
  }
});
