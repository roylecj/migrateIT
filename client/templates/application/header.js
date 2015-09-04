Template.header.helpers({
  currentUserName: function() {
    return Meteor.user().profile.name;
  },
  signedIn: function() {
    return Session.get("signedIn");
  }
});

Template.header.events({
  'click .btnLogout': function(e) {

    Meteor.logout();
    
    Session.set("signedIn", false);
    Router.go("login");
  }
});
