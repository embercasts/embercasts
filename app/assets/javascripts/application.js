//= require jquery
//= require handlebars.runtime
//= require ember
//= require app
//= require_tree .

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return [
      {id: 1, title: "ZOMG", subtitle: "Herp derp", videoURL: "http://www.youtube.com/embed/Sc_O7ZWVSJ0?rel=0"}
    ];
  }
});