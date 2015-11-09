Template.accounts.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});  
});

Template.accounts.helpers({
  account: function() {
    return Meteor.users.find({}, {sort: { username: 1 }}).fetch();
  }
});
