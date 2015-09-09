Template.header.helpers({
  currentUserName: function() {
    return Meteor.user().profile.name;
  },
  signedIn: function() {
    return Session.get("signedIn");
  },
  adminUser: function() {
    var usrId;

    usrId = Meteor.userId();

    var inRole;

    inRole = Roles.userIsInRole(usrId, ['admin']);
    if (inRole) {
      return true;
    } else {
      return false;
    }
  }
});

Template.header.events({
  'click .btnLogout': function(e) {

    Meteor.logout();

    Session.set("signedIn", false);
    Router.go("login");
  }
});
