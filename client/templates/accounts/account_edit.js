Template.accountEdit.onCreated(function() {
    Session.setDefault("resetPasswordFlag", false);
    Session.setDefault("activeFlag", true);
});

Template.accountEdit.onRendered(function() {
  Session.set("resetPasswordFlag", false);
  Session.set("activeFlag", true);
});

Template.accountEdit.helpers({
    personName: function() {
      return this.profile.name;
    },
    activeUser: function() {
      return Session.get("activeFlag");
    },
    emailAddress: function() {
      return this.emails[0].address;
    },
    passwordReset: function() {
      return Session.get("passwordResetFlag");
    },
    newPassword: function() {
      return Session.get("newPassword");
    },
    checkPermissions: function() {
      // This will check the permissions for the user and assign it here...
      var roles = Roles.getRolesForUser(this._id);

      // Initialise all of the values first.

      Session.set("canView", false);
      Session.set("canAdd", false);
      Session.set("canEdit", false);
      Session.set("canRemove", false);
      Session.set("isSuperUser", false);

      for (roleItem = 0; roleItem < roles.length; roleItem++) {
        var currentRole;

        currentRole = roles[roleItem];

        switch (currentRole) {
            case "admin":
                Session.set("canView", true);
                Session.set("canAdd", true);
                Session.set("canEdit", true);
                Session.set("canRemove", true);
                Session.set("isSuperUser", true);
                break;
            case "view":
                Session.set("canView", true);
                break;
            case "add":
                Session.set("canAdd", true);
                break;
            case "edit":
                Session.set("canEdit", true);
                break;
            case "remove":
                Session.set("canRemove", true);
                break;
        }
      }
    },
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

        Session.set("canView", true);
        Session.set("canAdd", true);
        Session.set("canEdit", true);
        Session.set("canRemove", true);

        return "list-group-item-info"
      } else {
        return ""
      }
    },
    resetPassword: function() {
      return Session.get("resetPasswordFlag");
    },
    passwordResetText: function() {
      if (Session.get("resetPasswordFlag") === false) {
        return "Reset Password"
      } else {
        return "Password Reset"
      }
    },
    passwordResetStatus: function() {
      if (Session.get("resetPasswordFlag") === false) {
        return "btn-info"
      } else {
        return "btn-success"
      }
    },
    resetPasswordFlag: function() {
      if (Session.get("resetPasswordFlag")) {
        return "btn-success"
      } else {
        return "btn-info"
      }
    }
});

Template.accountEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    // Save the user...

    var userId = this._id;
    var loginName = $('[name=loginName]').val();
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

    Meteor.call('updateUser', userId, loginName, emailAddress, personName, perms);

    Session.set("canView", false);
    Session.set("canAdd", false);
    Session.set("canEdit", false);
    Session.set("canRemove", false);
    Session.set("isSuperUser", false);

    // If we are changing the rights that a user has, and we are that users then we
    // need to go home, as we may not have access anymore...

    if (userId === Meteor.userId) {
      Router.go("home")
    } else {
      Router.go("accounts");
    }
  },
  'click .btnCanView': function(e) {
    e.preventDefault();
    Session.set("canView", ! Session.get("canView"));
  },
  'click .btnCanAdd' : function(e) {
    e.preventDefault();
    Session.set("canAdd", ! Session.get("canAdd"));
  },
  'click .btnCanEdit': function(e) {
    e.preventDefault();
    Session.set("canEdit", ! Session.get("canEdit"));
  },
  'click .btnCanRemove': function(e) {
    e.preventDefault();
    Session.set("canRemove", ! Session.get("canRemove"));
  },
  'click .resetPassword': function(e) {
    e.preventDefault();
//    debugger
    var userId = this._id;

    console.log(userId);

    // var newPasswd = Meteor.apply('updatePassword', [userId], { returnStubValue: true });

    Meteor.call('updatePassword', userId, function(e, res) {
        console.log("error=" + e);
        console.log("result=" + res);

        Session.set("newPassword", res);
    });
//    Session.set("newPassword", newPasswd);
    Session.set("passwordResetFlag", true);
  },
  'click .resetPasswordSuccess': function(e) {
    e.preventDefault();
    Session.set("passwordResetFlag", false);
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
  },
  'click .activeFlag': function(e) {
    e.preventDefault();
    console.log("setting active flag");
    Session.set("activeFlag", false);
  },
  'click .inactiveFlag': function(e) {
    e.preventDefault();
    console.log("unsetting active flag");

    Session.set("activeFlag", true);
  }
});
