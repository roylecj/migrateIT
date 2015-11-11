Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.login.onCreated(function() {
    Session.set('signedIn', false);
//    Session.setDefault('showPasswordField', false);
//    Session.setDefault('PasswordUnset', true);
});

/*
Template.login.onRendered(function() {
    Session.set('showPasswordField', false);
    Session.setDefault('PasswordUnset', true);
})
*/

/*
Template.login.helpers({
  showPassword: function() {
    Session.set('PasswordUnset', true);
    return Session.get("showPasswordField");
  },
  correctState: function() {
    if (Session.get("PasswordUnset")) {
      return ""
    }
    else {
      if (Session.get("PasswordErrorFlag")) {
        return "has-error"
      } else {
        return "has-success"
      }

    }
  },
  passwordError: function() {
    return Session.get("PasswordErrorFlag")
  }
});
*/

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId);

        console.log(e);

        if (!e) {
        Session.set('signedIn', true);
        Router.go('mappingTable');
      } else {
        sAlert.error('Error logging in: ' + e.reason);
      }
    });
  }
  /*,
  'click .changePassword': function(e) {
    e.preventDefault();

    Session.set("showPasswordField", true);
  },
  'click .updatePassword': function(e) {
    e.preventDefault();

    var oldPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=password]').val();
    var newPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=newPassword]').val();
    var confirmPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=confirmPassword]').val();

    var userId = $(e.target.parentNode.parentNode.parentNode).find('[name=loginName]').val();
    if (newPassword === confirmPassword) {
      Meteor.call('updatePasswordByUser', userId, oldPassword, newPassword, function(e, res) {
          if (res) {
            // ok, all good
            Session.set("newPassword", res);
            Session.set("showPasswordField", false);
            sAlert.success('Password updated');
          } else {
            // problem with updating password
            sAlert.error('Problem updating password - current password invalid')
          }
      });
    } else {
      sAlert.error('Unable to change password as passwords do not match');
    }
  },
  'keyup .newPassword': function(e) {
    Session.set("PasswordUnset", false);

    var newPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=newPassword]').val();
    var confirmPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=confirmPassword]').val();

    if (newPassword !== confirmPassword) {
      if (!confirmPassword) {
        Session.set("PasswordErrorFlag", true);
      } else {
        Session.set("PasswordUnset", true);
        Session.set("PasswordErrorFlag", false);
      }
    } else {
      Session.set("PasswordErrorFlag", false);
    }

  },
  'keyup .confirmPassword': function(e) {
    Session.set("PasswordUnset", false);

    var newPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=newPassword]').val();
    var confirmPassword = $(e.target.parentNode.parentNode.parentNode).find('[name=confirmPassword]').val();

    if (newPassword !== confirmPassword) {
      if (!confirmPassword) {
        Session.set("PasswordErrorFlag", true);
      } else {
        Session.set("PasswordUnset", true);
        Session.set("PasswordErrorFlag", false);
      }
    } else {
      Session.set("PasswordErrorFlag", false);
    }

  }
  */

})
