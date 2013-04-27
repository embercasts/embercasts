//= require jquery
//= require handlebars.runtime
//= require ember
//= require app
//= require_tree .

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return [
      {id: 1, date: "2013-03-27", title: "Rise of the Clients", subtitle: "Erik talks about the evolution happening with web applications from server generated HTML to client-side MVC. He also talks about the philosophy behind Ember and some of the upcoming things that will make Ember even better from 1.0 and onward.", videoId: "Sc_O7ZWVSJ0"},
      {id: 2, date: "2013-04-24", title: "Ember JS Testing Made Easy and Fast", subtitle: "Ember JS integration testing is now built into ember. This introduction will give you all the information you need to get started.", videoId: "nO1hxT9GBTs"}
    ];
  }
});