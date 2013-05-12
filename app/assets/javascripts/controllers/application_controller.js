App.ApplicationController = Ember.ArrayController.extend({
  embercasts: Ember.computed.alias('content')
});

App.IndexController = Ember.ArrayController.extend({
  embercasts: Ember.computed.alias('content')
});