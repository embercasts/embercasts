App.EmbercastController = Ember.ObjectController.extend({
  showLinks: false,

  share: function() {
    return this.toggleProperty('showLinks');
  },

  shareLinks: function() {
    return App.ShareLink.supportedTargets.map(function(i) {
      if( App.ShareLink.supportedTargets.indexOf(i) >= 0 ) {
        link = this._fullLink(this.get('youtube_id'));
        link = this._fullLink(this.get('youtube_id'));
        return App.ShareLink.create({target: i, link: link, topicTitle: this.get('title')});
      } else {
        return null;
      }
    }, this).compact();
  }.property('link'),

  sharePopup: function(target, url) {
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=' + App.ShareLink.popupHeight(target));
    return false;
  },

  _fullLink: function(link) {
    return 'http://embercasts.com/#/embercasts/' + link;
  }
});
