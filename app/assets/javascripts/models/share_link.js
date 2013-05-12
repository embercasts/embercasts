App.ShareLink = Ember.Model.extend({

  href: function() {
    return App.ShareLink.urlFor(this.get('target'), this.get('link'), this.get('topicTitle'));
  }.property('target', 'link', 'topicTitle'),

  title: function() {
    return(this.get('topicTitle'));
  }.property('topicTitle'),

  openInPopup: function() {
    return( this.get('target') !== 'email' );
  }.property('target')

});

App.ShareLink.reopenClass({

  supportedTargets: ['twitter', 'facebook', 'google+', 'email'],

  urlFor: function(target,link,title) {
    switch(target) {
      case 'twitter':
        return this.twitterUrl(link,title);
      case 'facebook':
        return this.facebookUrl(link,title);
      case 'google+':
        return this.googlePlusUrl(link);
      case 'email':
        return this.emailUrl(link,title);
    }
  },

  twitterUrl: function(link, title) {
    return ("http://twitter.com/intent/tweet?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent('Embercast: ' + title) );
  },

  facebookUrl: function(link, title) {
    return ("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(link) + '&t=' + encodeURIComponent('Embercast: ' + title));
  },

  googlePlusUrl: function(link) {
    return ("https://plus.google.com/share?url=" + encodeURIComponent(link));
  },

  emailUrl: function(link, title) {
    return ("mailto:?to=&subject=" + encodeURIComponent('Embercast: ' + title) + "&body=" + encodeURIComponent(link));
  },


  popupHeights: {
    twitter: 265,
    facebook: 315,
    'google+': 600
  },

  popupHeight: function(target) {
    return (this.popupHeights[target] || 315);
  }
});
