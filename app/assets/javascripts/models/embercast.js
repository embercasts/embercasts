var attr = Ember.attr;

App.Embercast = Ember.Model.extend({
  id: attr(),
  title: attr(),
  description: attr(),
  youtube_id: attr(),
  video_url: attr(),
  date: attr(),
  time: attr(),
  keywords: attr(),

  poster: function() {
    if (this.get('video_url')) {
      return '/assets/poster.png';
    } else {
      return '/assets/poster-coming-soon.png';
    }
  }.property('video_url')
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
      "video_url" : "http://www.embercasts.com/video/ember-model-draft-high.mp4",
      "youtube_id" : "FtcsS8GvRPQ",
      "description" : "",
      "title" : "Getting started with Ember Model",
      "date" : "2013.05.12",
      "keywords" : ['ember-model', 'beginner', 'models'],
      "time" : "XX:XX"
    }, {
      "id": 2,
      "video_url" : "http://www.embercasts.com/video/emblem-final-high.mp4",
      "youtube_id" : "h1M4zUXtrNk",
      "description" : "",
      "title" : "Getting started with Emblem.js",
      "date" : "2013.05.12",
      "keywords" : ['templates', 'emblem.js', 'beginner'],
      "time" : "XX:XX"
    }, {
      "id": 3,
      "video_url" : "http://www.embercasts.com/video/autocomplete-draft-high.mp4",
      "youtube_id" : "Bkwh1bNwuQ8",
      "description" : "",
      "title" : "Building an autocomplete widget - part one",
      "date" : "2013.05.12",
      "keywords" : ['autocomplete', 'beginner'],
      "time" : "XX:XX"
    }, {
      "id": 4,
      "video_url" : "",
      "description" : "",
      "title" : "Client-side authentication",
      "date" : "2013.05.12",
      "keywords" : ['authentication', 'router', 'intermediate'],
      "time" : "XX:XX"
    }
  ]
};
