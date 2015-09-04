Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('mappingTables'),
      Meteor.subscribe('mappingTableItems'),
      Meteor.subscribe("errorReports"),
      Meteor.subscribe("migrationAudit")];
  }
});

Router.route('/', {name: 'login'});

Router.route('/home', {name: 'home'});
Router.route('/map', {
  name: 'mappingTable'
});
Router.route('/errors', {
  name: 'errorReports'
});
Router.route('/audit', {
  name: 'auditInfo'
});
Router.route('/mapping/:_id', {
  name: 'mappingItems',
  data: function() {
    return MappingTables.findOne(this.params._id);
  }
});

var requireLogin = function() {

  console.log("requiring login");

  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    this.next();
  }
};

// Make sure that you are logged in before we start doing this...
Router.onBeforeAction(requireLogin, {except: 'login'});
