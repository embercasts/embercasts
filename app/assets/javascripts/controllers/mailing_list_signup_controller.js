App.MailingListSignupController = Ember.Controller.extend({
  email: null,
  submitting: false,

  signup: function() {
    var self = this, email = this.get('email');
    self.set('submitting', true);
    $.post("http://api.embercasts.com/beta/signup", {email: email}).then(function() {
      self.set('hasSignedUp', true);
    }, function() {
      self.set('submitting', false);
    });
  }
});
