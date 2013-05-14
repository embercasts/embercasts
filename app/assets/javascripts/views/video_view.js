function logEvent(name) {
  return function(e) {
    console.log(name, e);
  };
}

function formatTime(time) {
  var mins = Math.floor(time / 60),
      secs = Math.floor(time % 60);

  return mins + ":" + (secs < 10 ? '0' + secs : secs);
}

var events = ("abort canplay canplaythrough durationchange emptied ended error loadeddata " +
             "loadedmetadata loadstart mozaudioavailable pause play playing progress " +
             "ratechange seeked seeking suspend timeupdate volumechange waiting").w();

var attrs = {
  tagName: 'video',
  templateName: 'video',

  attributeBindings: ['width', 'height', 'preload', 'poster', 'controls'],

  width:    1000,
  height:   600,
  preload:  'none',
  controls: 'true',
  poster:   Ember.computed.alias('context.poster'),

  currentTime: null,
  duration:    null,
  isPlaying:   null,
  isPaused:    Ember.computed.not('isPlaying'),
  isLoaded:    null,
  isMuted:     null,
  volume:      null,

  didInsertElement: function() {
    var el = this.get('element');
    var eventName;
    for (var i = 0, l = events.length; i < l; i++) {
      eventName = events[i];
      el.addEventListener(eventName, this[eventName].bind(this));
    }
  },

  willDestroyElement: function() {
    var el = this.get('element');
    var eventName;
    for (var i = 0, l = events.length; i < l; i++) {
      eventName = events[i];
      el.removeEventListener(eventName, this[eventName].bind(this));
    }
  },

  formattedCurrentTime: function() {
    return formatTime(this.get('currentTime'));
  }.property('currentTime'),

  formattedDuration: function() {
    return formatTime(this.get('duration'));
  }.property('duration'),

  // events

  loadstart: Ember.K,
  play: Ember.K,
  waiting: Ember.K,
  durationchange: Ember.K,
  loadeddata: Ember.K,
  canplay: Ember.K,
  canplaythrough: Ember.K,

  loadedmetadata: function(e) {
    this.set('currentTime', e.target.currentTime);
    this.set('duration', e.target.duration);
  },

  playing: function(e) {
    this.set('isPlaying', true);
    console.log('isPlaying', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  },

  pause: function(e) {
    this.set('isPlaying', false);
    console.log('isPaused', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  },

  timeupdate: function(e) {
    this.set('currentTime', e.target.currentTime);
    // console.log('timeupdate', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  },

  progress: function(e) {
    // var buffered = e.target.buffered;
    // console.log('progress', buffered.length && buffered.start(0), buffered.length && buffered.end(0));
  },

  suspend: function(e) {
    this.set('isLoaded', true);
    // var buffered = e.target.buffered;
    // console.log('suspend', buffered.length && buffered.start(0), buffered.length && buffered.end(0));
  },

  volumechange: function(e) {
    this.set('isMuted', e.target.muted);
    this.set('volume',  e.target.volume);
  },

  seeking: function(e) {
    console.log('seeking', this.get('formattedCurrentTime'), this.get('formattedDuration'), formatTime(e.target.currentTime));
  },

  seeked: function(e) {
    console.log('seeked', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  }
};

var eventName;
for (var i = 0, l = events.length; i < l; i++) {
  eventName = events[i];
  if (!attrs[eventName]) {
    attrs[eventName] = logEvent(eventName);
  }
}

App.VideoView = Ember.View.extend(attrs);