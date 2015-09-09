Template.mappingTable.helpers({
  mappingTable: function() {
    return MappingTables.find({activeFlag: true}).fetch();
  },
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id}).count();
  },
  isSuperUser: function() {
    var loggedInUser = Meteor.user().username;
    var perms = ['admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return true;
    } else {
      return false;
    }
  }
});
