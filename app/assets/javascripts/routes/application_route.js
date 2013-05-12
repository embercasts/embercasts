App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Embercast.find();
  },

  // redirect: function() {
  //   this.transitionTo('embercasts');
  // },

  events: {
    sharePopup: function(target, url) {
      window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=' + App.ShareLink.popupHeight(target));
      return false;
    }
  }
});