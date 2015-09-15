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
//      return "btn-info"
      return "list-group-item-info"
    } else {
      return ""
    }
  },
  canAdd: function() {
    if (Session.get("canAdd")) {
      return "list-group-item-info"
    } else {
      return ""
    }
  },
  canEdit: function() {
    if (Session.get("canEdit")) {
      return "list-group-item-info"
    } else {
      return ""
    }
  },
  canRemove: function() {
    if (Session.get("canRemove")) {
      return "list-group-item-info"
    } else {
      return ""
    }
  },
  isSuperUser: function() {
    if (Session.get("isSuperUser")) {
      return "list-group-item-info"
    } else {
      return ""
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
    var perms = [];

    if (Session.get("isSuperUser")) {
      perms.push("admin");
    };
    if (Session.get("canAdd")) {
      perms.push("add");
    };
    if (Session.get("canEdit")) {
      perms.push("edit");
    };
    if (Session.get("canRemove")) {
      perms.push("remove");
    };
    if (Session.get("canView")) {
      perms.push("view");
    };

    Meteor.call('addUser', loginName, passwd, emailAddress, personName, perms);

    Session.set("canView", false);
    Session.set("canAdd", false);
    Session.set("canEdit", false);
    Session.set("canRemove", false);
    Session.set("isSuperUser", false);
                
    Router.go("accounts");
  },
  'click .btnCanView': function(e) {
    e.preventDefault();
    Session.set("canView", ! Session.get("canView"));
/*
    if (Session.get("canView") === false) {
      Session.set("canAdd", false);
      Session.set("canEdit", false);
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    }
    */
  },
  'click .btnCanAdd' : function(e) {
    e.preventDefault();
    Session.set("canAdd", ! Session.get("canAdd"));

    if (Session.get("canAdd")){
      Session.set("canView", true);
    }
    /*else {
      Session.set("canAdd", false);
      Session.set("canEdit", false);
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    } */
  },
  'click .btnCanEdit': function(e) {
    e.preventDefault();
    Session.set("canEdit", ! Session.get("canEdit"));

    if (Session.get("canEdit")){
      Session.set("canView", true);
//      Session.set("canAdd", true);
    }
    /* else {
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);
    }*/
  },
  'click .btnCanRemove': function(e) {
    e.preventDefault();
    Session.set("canRemove", ! Session.get("canRemove"));

    if (Session.get("canRemove")){
/*      Session.set("canView", true);
      Session.set("canAdd", true);
      Session.set("canEdit", true); */
      Session.set("canRemove", true);
    } /* else {
      Session.set("isSuperUser", false);
    } */
  },
  'click .btnSuperUser': function(e) {
      e.preventDefault();
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
