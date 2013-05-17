Ember.Handlebars.registerHelper('trackedLink', function(hrefPath, eventName, options) {
  var hash = options.hash;
  hash.href = Ember.Handlebars.get(this, hrefPath, options);
  hash.eventName = eventName;
  return Ember.Handlebars.helpers.view.call(this, App.TrackedLinkView, options);
});
