var attr = Ember.attr;

App.Embercast = Ember.Model.extend({
  id: attr(),
  title: attr(),
  description: attr(),
  youtube_id: attr(),
  mp4_url: attr(),
  webm_url: attr(),
  date: attr(),
  time: attr(),
  keywords: attr(),

  poster: function() {
    if (this.get('mp4_url')) {
      return '/assets/poster.png';
    } else {
      return '/assets/poster-coming-soon.png';
    }
  }.property('mp4_url')
});

App.Embercast.adapter = Ember.Adapter.create({
  find: function(record, id) {
    var data = EMBERCAST_DATA.embercasts,
        recordData = data.findProperty('id', id);

    record.load(id, recordData);
  },

  findAll: function(klass, records) {
    records.load(klass, EMBERCAST_DATA.embercasts);
  }
});

var EMBERCAST_DATA = {
  "embercasts" : [
    {
      "id" : 1,
      "mp4_url" : "http://video1.embercasts.com/ember-model-draft-high.mp4",
      "webm_url" : "http://video1.embercasts.com/ember-model-draft-high.webm",
      "youtube_id" : "FtcsS8GvRPQ",
      "description" : "",
      "title" : "Getting started with Ember Model",
      "date" : "12 MAY 13",
      "keywords" : ['ember-model', 'beginner', 'models'],
      "time" : "XX:XX"
    }, {
      "id": 2,
      "mp4_url" : "http://www.embercasts.com/video/emblem-final-high.mp4",
      "webm_url" : "http://video1.embercasts.com/emblem-final-high.webm",
      "youtube_id" : "h1M4zUXtrNk",
      "description" : "",
      "title" : "Getting started with Emblem.js",
      "date" : "12 MAY 13",
      "keywords" : ['templates', 'emblem.js', 'beginner'],
      "time" : "XX:XX"
    }, {
      "id": 3,
      "mp4_url" : "http://video1.embercasts.com/autocomplete-draft-high.mp4",
      "webm_url" : "http://video1.embercasts.com/autocomplete-draft-high.webm",
      "youtube_id" : "Bkwh1bNwuQ8",
      "description" : "",
      "title" : "Building an autocomplete widget - part one",
      "date" : "12 MAY 13",
      "keywords" : ['autocomplete', 'beginner'],
      "time" : "XX:XX"
    }, {
      "id": 4,
      "mp4_url" : "http://video1.embercasts.com/authentication-part1-high.mp4",
      "webm_url" : "http://video1.embercasts.com/authentication-part1-high.webm",
      "description" : "",
      "title" : "Client-side authentication",
      "date" : "12 MAY 13",
      "keywords" : ['authentication', 'router', 'intermediate'],
      "time" : "XX:XX"
    }
  ]
};
