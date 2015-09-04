Template.mappingTableItem.helpers({
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id, activeFlag: true}).count();
  }
});

Template.mappingTableItem.events({
  'click .btnRemoveTable': function(e) {
    var mappingTable = this._id;

    Meteor.call('removeMappingTable', mappingTable);
  }
});
