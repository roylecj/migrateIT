Template.accounts.helpers({
  account: function() {
    return Meteor.users.find().fetch();
  }
});
