Template.mappingTable.helpers({
  mappingTable: function() {
    return MappingTables.find({activeFlag: true}).fetch();
  },
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id}).count();
  }
});
