Template.accounts.helpers({
  account: function() { 
    return UserInfo.find().fetch();
  }
});
