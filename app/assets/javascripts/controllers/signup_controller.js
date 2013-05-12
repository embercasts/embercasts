App.SignupController = Ember.Controller.extend({
  email: null,

  signup: function() {
    var self = this,
       email = this.get('email');

    $.post("http://api.embercasts.com/beta/signup", {email: email}).then(function() {
      self.set('email', null);
      self.set('flash', "Thanks for signing up! We'll send you an invite shortly!");
    }, function() {
      alert("Failure to signup :(");
    });
  }
});