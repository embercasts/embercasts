App.ShareLinksView = Ember.View.extend({
  tagName: 'li',
  templateName: 'share_links',
  classNameBindings: ['showLinks:show'],
  showLinks: false,

  mouseEnter: function() {
    this.trigger('shareShow');
  },

  mouseLeave: function() {
    this.trigger('shareShow');
  },

  touchEnd: function() {
    this.trigger('shareShow');
  },

  shareShow: function() {
    this.toggleProperty('showLinks');
    return this.get('controller').send('share');
  },

  share: function() {
    alert('dave');
  }

});
