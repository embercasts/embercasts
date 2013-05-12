App.Router.map(function() {
  this.route('beta', {path: 'beta/:token'});

  this.route('embercast', {path: 'episodes/:embercast_id'});
  this.route('about');
  this.route('contact');
});

App.Router.reopen({
  location: 'history' // use pushState
});