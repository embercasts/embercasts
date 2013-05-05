App.Router.map(function() {
  this.resource('embercasts', function() {
    this.route('embercast', {path:'/:embercast_id'});
  });
});
