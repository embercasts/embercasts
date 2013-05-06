var attr = Ember.attr;

App.Embercast = Ember.Model.extend({
  id: attr(),
  title: attr(),
  description: attr(),
  youtube_id: attr(),
  video_url: attr(),
  date: attr(),
  time: attr(),
  keywords: attr()
});

App.Embercast.adapter = Ember.Adapter.create({
  find: function(record, id) {
    var data = EMBERCAST_DATA.embercasts,
        recordData = data.findProperty('id', id);

    record.load(id, recordData);
  },

  findAll: function(klass, records) {
    var data = EMBERCAST_DATA.embercasts;
    // data.forEach(function(r) { r.id = r.youtube_id; }); // TODO: should really fix this in EM :P
    records.load(klass, data);
  }
});

var EMBERCAST_DATA = {
  "embercasts" : [
    {
      "id" : 1,
      // "youtube_id" : "Sc_O7ZWVSJ0",
      "video_url" : "https://googledrive.com/host/0BzsIltkR5Ng-QzV6NEYwX1djZzg/EmberCast%20draft%20-%20Ember%20Model%20(low).mp4",
      "description" : "",
      "title" : "Getting started with Ember Model",
      "date" : "2013-05-06",
      "keywords" : ['ember-model', 'beginner', 'models'],
      "time" : "XX:XX"
    }, {
      "id": 2,
      // "youtube_id" : "nO1hxT9GBTs",
      "video_url" : "https://googledrive.com/host/0BzsIltkR5Ng-QzV6NEYwX1djZzg/EmblemDraft2_full.mp4",
      "description" : "",
      "title" : "Getting started with Emblem.js",
      "date" : "2013-05-06",
      "keywords" : ['templates', 'emblem.js', 'beginner'],
      "time" : "XX:XX"
    }
  ]
};
