// var attr = Model.attr;

// App.Embercast = Ember.Model.extend({
//   title: attr(),
//   description: attr(),
//   youtube_id: attr(),
//   date: attr(),
//   keywords: attr()
// });

// App.Embercast.adapter = Ember.Adapter.create({
//   findAll: function(klass, records) {
//     var data = EMBERCAST_DATA.embercasts;
//     data.forEach(function(r) { r.id = r.youtube_id; }); // TODO: should really fix this in EM :P
//     records.load(klass, data);
//   }
// });

// var EMBERCAST_DATA = {
//   "embercasts" : [ {
//     "id" : '1',
//     "youtube_id" : "Sc_O7ZWVSJ0",
//     "description" : "Erik talks about the evolution happening with web applications from server generated HTML to client-side MVC. He also talks about the philosophy behind Ember and some of the upcoming things that will make Ember even better from 1.0 and onward.",
//     "title" : "Rise of the Clients",
//     "date" : "27.03.13",
//     "keywords" : ['ember view', 'ember run loop', 'bindings']
//   }, {
//     "id": '2',
//     "youtube_id" : "nO1hxT9GBTs",
//     "description" : "Ember JS integration testing is now built into ember. This introduction will give you all the information you need to get started.",
//     "title" : "Ember JS Testing Made Easy and Fast",
//     "date" : "24.04.13",
//     "keywords" : ['ember view', 'ember run loop']
//   } ]
// };

var attr = DS.attr;

App.Embercast = DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  youtube_id: attr('string'),
  date: attr('string'),
  keywords: attr('string')
});

App.store = DS.Store.create({
    revision : 11,
    adapter: DS.FixtureAdapter
});


App.Embercast.FIXTURES = [ {
    "id" : '1',
    "youtube_id" : "Sc_O7ZWVSJ0",
    "description" : "Erik talks about the evolution happening with web applications from server generated HTML to client-side MVC. He also talks about the philosophy behind Ember and some of the upcoming things that will make Ember even better from 1.0 and onward.",
    "title" : "Rise of the Clients",
    "date" : "27.03.13",
    "keywords" : ['ember view', 'ember run loop', 'bindings']
  }, {
    "id": '2',
    "youtube_id" : "nO1hxT9GBTs",
    "description" : "Ember JS integration testing is now built into ember. This introduction will give you all the information you need to get started.",
    "title" : "Ember JS Testing Made Easy and Fast",
    "date" : "24.04.13",
    "keywords" : ['ember view', 'ember run loop']
  }
];
