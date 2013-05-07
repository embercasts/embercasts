App.Router.map(function() {
  this.resource('embercasts', function() {
    this.route('show', {path:'/:embercast_id'});
  });
});
