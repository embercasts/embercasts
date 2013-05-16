function formatTime(time) {
  var mins = Math.floor(time / 60),
      secs = Math.floor(time % 60);

  return mins + ":" + (secs < 10 ? '0' + secs : secs);
}

var events = ("abort canplay canplaythrough durationchange emptied ended error loadeddata " +
             "loadedmetadata loadstart mozaudioavailable pause play playing progress " +
             "ratechange seeked seeking suspend timeupdate volumechange waiting").w();

App.VideoView = Ember.View.extend({
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

  // workaround for https://github.com/emberjs/ember.js/issues/2666
  _controllerContentDidChange: function() {
    this.rerender();
  }.observes('controller.content'),

  formattedCurrentTime: function() {
    return formatTime(this.get('currentTime'));
  }.property('currentTime'),

  formattedDuration: function() {
    return formatTime(this.get('duration'));
  }.property('duration'),

  analyticsData: function() {
    var data = this.getProperties('currentTime', 'duration', 'volume');
    data.videoId = this.get('context.id');
    return data;
  },

  report: function(eventName) {
    var analyticsController = this.get('controller.analyticsController');
    if (!analyticsController) { throw new Error('analyticsController not found!'); }
    analyticsController.report(eventName, this.analyticsData());
  },

  // events

  loadstart: Ember.K,
  play: Ember.K,
  waiting: Ember.K,
  durationchange: Ember.K,
  loadeddata: Ember.K,
  canplay: Ember.K,
  canplaythrough: Ember.K,
  abort: Ember.K,
  emptied: Ember.K,
  error: Ember.K,
  mozaudioavailable: Ember.K,
  ratechange: Ember.K,

  loadedmetadata: function(e) {
    this.set('currentTime', e.target.currentTime);
    this.set('duration', e.target.duration);
  },

  playing: function(e) {
    this.set('isPlaying', true);
    this.report('playing');
    // console.log('isPlaying', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  },

  pause: function(e) {
    this.set('isPlaying', false);
    this.report('pause');
    // console.log('isPaused', this.get('formattedCurrentTime'), this.get('formattedDuration'));
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
    // TODO: track download time

    // var buffered = e.target.buffered;
    // console.log('suspend', buffered.length && buffered.start(0), buffered.length && buffered.end(0));
  },

  volumechange: function(e) {
    this.set('isMuted', e.target.muted);
    this.set('volume',  e.target.volume);
  },

  // iOS doesn't send seek events
  seeking: function(e) {
    // console.log('seeking', this.get('formattedCurrentTime'), this.get('formattedDuration'), formatTime(e.target.currentTime));
  },

  seeked: function(e) {
    this.report('seeked');
    // console.log('seeked', this.get('formattedCurrentTime'), this.get('formattedDuration'));
  },

  ended: function(e) {
    this.report('ended');
  }
});