var attr = Ember.attr;

App.Embercast = Ember.Model.extend({
  id: attr(),
  title: attr(),
  description: attr(),
  youtube_id: attr(),
  mp4_url: attr(),
  webm_url: attr(),
  source_url: attr(),
  date: attr(),
  time: attr(),
  keywords: attr(),
  slug: attr(),
  ember_version: attr(),

  poster: function() {
    if (this.get('mp4_url')) {
      return '/assets/poster.png';
    } else {
      return '/assets/poster-coming-soon.png';
    }
  }.property('mp4_url')
});

App.Embercast.adapter = Ember.Adapter.create({
  find: function(record, slug) {
    var data = EMBERCAST_DATA,
        recordData = data.findProperty('slug', slug);

    record.load(slug, recordData);
  },

  findAll: function(klass, records) {
    records.load(klass, EMBERCAST_DATA);
  }
});

var EMBERCAST_DATA = Ember.$.parseJSON(Ember.$('[type="text/x-embercasts"]').html());

