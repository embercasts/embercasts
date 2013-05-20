App.Router.map(function() {
  this.route('beta', {path: 'beta/:token'});
  this.route('signup');

  this.route('episode', {path: 'episodes/:embercast_id'});
  this.route('about');
  this.route('contact');

  this.route('notFound', {path: '/*path'});
});

App.Router.reopen({
  location: 'history'
});

// Fix supports IE9 use of Router.location history
if (!window.history.pushState) {
  Ember.LinkView.reopen({
    click: function() {
      window.location.replace(this.get('href'));
    }
  });

  Ember.HistoryLocation.reopen({
    replaceState: function() {}
  });
}
