Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('mappingTables'),
      Meteor.subscribe('mappingTableItems'),
      Meteor.subscribe("errorReports"),
      Meteor.subscribe("migrationAudit"),
      Meteor.subscribe("userDirectory"),
      Meteor.subscribe("auditDetails"),
      Meteor.subscribe("systemDetails"),
      Meteor.subscribe("mappingTableSystems")];
  }
});

Router.route('/', {name: 'login'});

Router.route('/home', {name: 'home'});
Router.route('/map', {
  name: 'mappingTable'
});

Router.route('/mapAdd', {
  name: 'mappingTableAdd'
});

Router.route('/users', {
  name: 'accounts'
});

Router.route('/users/add', {
    name: 'accountAdd'
});

Router.route('/users/:_id', {
    name: 'accountEdit',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    }
})
Router.route('/systems', {
    name: 'systemDetails'
});

Router.route('/system/:_id', {
    name: 'systemEdit',
    data: function() {
      return SystemDetails.findOne(this.params._id);
    }
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

var requireAdmin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    var usrId;

    usrId = Meteor.userId();

    var inRole;

    inRole = Roles.userIsInRole(usrId, ['admin']);
    if (inRole) {
      this.next();
    } else {
      this.render('accessDenied');
    }
  }
}
// Make sure that you are logged in before we start doing this...
Router.onBeforeAction(requireLogin, {except: 'login'});
Router.onBeforeAction(requireAdmin, {only: ['accounts', 'accountAdd', 'systemDetails', 'systemEdit']});
