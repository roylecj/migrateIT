Template.mappingTable.helpers({
  mappingTable: function() {
    return MappingTables.find().fetch();
  },
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id}).count();
  }
});
