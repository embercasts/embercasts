//= require jquery
//= require handlebars.runtime
//= require ember
//= require ember-model
//= require app
//= require_tree .

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Screencast.find();
  }
});