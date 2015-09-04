Template.mappingTableItem.helpers({
  mappingCount: function() {
    return MappingTableItems.find({tableId: this._id, activeFlag: true}).count();
  }
});
