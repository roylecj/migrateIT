Template.accountAdd.onCreated(function() {
  Session.setDefault("canView", false);
  Session.setDefault("canAdd", false);
  Session.setDefault("canEdit", false);
  Session.setDefault("canRemove", false);
  Session.setDefault("isSuperUser", false);
});

Template.accountAdd.helpers({
  canView: function() {
    if (Session.get("canView")) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  canAdd: function() {
    if (Session.get("canAdd")) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  canEdit: function() {
    if (Session.get("canEdit")) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  canRemove: function() {
    if (Session.get("canRemove")) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  isSuperUser: function() {
    if (Session.get("isSuperUser")) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  }
});

Template.accountAdd.events({
  'submit form': function(e) {
    e.preventDefault();

    // Save the user...
// addUser: function(loginName, passwd, emailAddress, personName, perms)

    var loginName = $('[name=loginName]').val();
    var passwd = $('[name=password]').val();
    var emailAddress = $('[name=email]').val();
    var personName = $('[name=userName]').val();
    var perms = {};

    Meteor.call('addUser', loginName, passwd, emailAddress, personName, perms);

    Router.go("accounts");
  },
  'click .btnCanView': function(e) {
    Session.set("canView", ! Session.get("canView"));

    if (Session.get("canView") === false) {
      Session.set("canAdd", false);
      Session.set("canEdit", false);
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    }
  },
  'click .btnCanAdd' : function(e) {
    Session.set("canAdd", ! Session.get("canAdd"));

    if (Session.get("canAdd")){
      Session.set("canView", true);
    } else {
      Session.set("canAdd", false);
      Session.set("canEdit", false);
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    }
  },
  'click .btnCanEdit': function(e) {
    Session.set("canEdit", ! Session.get("canEdit"));

    if (Session.get("canEdit")){
      Session.set("canView", true);
      Session.set("canAdd", true);
    } else {
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    }
  },
  'click .btnCanRemove': function(e) {
    Session.set("canRemove", ! Session.get("canRemove"));

    if (Session.get("canRemove")){
      Session.set("canView", true);
      Session.set("canAdd", true);
      Session.set("canEdit", true);
      Session.set("canRemove", true);
    } else {
      Session.set("isSuperUser", false);
    }
  },
  'click .btnSuperUser': function(e) {
    Session.set("isSuperUser", ! Session.get("isSuperUser"));

    if (Session.get("isSuperUser")){
      Session.set("canView", true);
      Session.set("canAdd", true);
      Session.set("canEdit", true);
      Session.set("canRemove", true);
      Session.set("isSuperUser", true);
    }
  }
});
