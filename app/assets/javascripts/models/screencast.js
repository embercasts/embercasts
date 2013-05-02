var attr = Ember.attr;

App.Screencast = Ember.Model.extend({
  title: attr(),
  description: attr(),
  youtube_id: attr(),
  date: attr()
});

App.Screencast.adapter = Ember.Adapter.create({
  firebase: new Firebase("https://embercasts.firebaseio.com/screencasts"),

  findAll: function(klass, records) {
    this.firebase.once('value', function(result) {
      var data = result.val();
      data.forEach(function(r) { r.id = r.youtube_id; }); // TODO: should really fix this in EM :P
      records.load(klass, data);
    });
  }
});

/*

[ {
  "youtube_id" : "Sc_O7ZWVSJ0",
  "description" : "Erik talks about the evolution happening with web applications from server generated HTML to client-side MVC. He also talks about the philosophy behind Ember and some of the upcoming things that will make Ember even better from 1.0 and onward.",
  "title" : "Rise of the Clients",
  "date" : "2013-03-27"
}, {
  "youtube_id" : "nO1hxT9GBTs",
  "description" : "Ember JS integration testing is now built into ember. This introduction will give you all the information you need to get started.",
  "title" : "Ember JS Testing Made Easy and Fast",
  "date" : "2013-04-24"
} ]

*/