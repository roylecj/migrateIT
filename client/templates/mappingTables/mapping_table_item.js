Template.mappingTableItem.helpers({
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id, activeFlag: true}).count();
  },
  removeDisabled: function() {
    var loggedInUser = Meteor.user().username;
    var perms = ['admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return '';
    } else {
      return 'hide';
    }

  }
});

Template.mappingTableItem.events({
  'click .btnRemoveTable': function(e) {
    var mappingTable = this._id;

    Meteor.call('removeMappingTable', mappingTable);
  }
});
