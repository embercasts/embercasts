App.AnalyticsController = Ember.Controller.extend({
  report: function(category, eventName, data) {
    data.event = eventName;
    $.post("http://api.embercasts.com/analytics", data);

    _gaq.push(['_trackEvent', category, eventName, JSON.stringify(data)]);
  }
});
