App.AnalyticsController = Ember.Controller.extend({
  report: function(eventName, data) {
    data.event = eventName;
    $.post("http://api.embercasts.com/analytics", data);

    _gaq.push(['_trackEvent', 'Videos', eventName, JSON.stringify(data)]);
  }
});