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
  },
  unreadTasks: function() {
    var userId = Meteor.user()._id;

    console.log("userid= " + userId);

    if (Tasks.find({user: userId, seenFlag: false, completeFlag: false}).count() > 0) {
      return true
    } else {
      return false
    }
  },
  taskCount: function() {
    var userId = Meteor.user()._id;

    return Tasks.find({user: userId, seenFlag: false, completeFlag: false}).count()
  }
});

Template.header.events({
  'click .btnLogout': function(e) {

    Meteor.logout();

    Session.set("signedIn", false);
    Router.go("login");
  }
});
