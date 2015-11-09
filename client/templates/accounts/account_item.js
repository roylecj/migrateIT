Template.accountItem.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});

Template.accountItem.helpers({
  userPersonName: function() {
    return this.profile.name;
  },
  canView: function() {
    var loggedInUser = this.username;

    var perms = ['view', 'admin'];

    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return 'btn-info';
    } else {
      return 'btn-default';
    }
  },
  canAdd: function() {
    var loggedInUser = this.username;

    var perms = ['add', 'admin'];

    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return 'btn-info';
    } else {
      return 'btn-default';
    }
  },
  canEdit: function() {
    var loggedInUser = this.username;

    var perms = ['edit', 'admin'];

    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return 'btn-info';
    } else {
      return 'btn-default';
    }

  },
  canRemove: function() {
    var loggedInUser = this.username;

    var perms = ['remove', 'admin'];

    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      console.log("success");
      return 'btn-info';
    } else {
      return 'btn-default';
    }
  },
  isSuperUser: function() {
    var loggedInUser = this.username;

    var perms = ['admin'];

    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return 'btn-info';
    } else {
      return 'btn-default';
    }
  }
});

Template.accountItem.events({
    'click .btnRemoveUser': function(e) {
      var userId = "";

      userId = $(e.target.parentNode.parentNode).find('[name=currentUser]').text();
      if (userId) {
        Meteor.call('removeUser', userId);

      }
    },
    'click .dataColumn': function(e) {
      Router.go("accountEdit", {_id: this._id});
    }
});
