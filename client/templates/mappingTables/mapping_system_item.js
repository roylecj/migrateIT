Template.mappingSystemItem.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});

Template.mappingSystemItem.helpers({
  editingTable: function() {
    return Session.get("editingTable");
  },
  isUsed: function() {
    var isUsedFlag = 0;
    isUsedFlag = MappingTableSystems.find({
      systemId: this._id,
      tableId: Session.get("editingRecord"),
      activeFlag: true
    }).count();

    if (isUsedFlag > 0) {
      return "btn-info"
    } else {
      return "btn-default"
    }
  },
  isUsedFlag: function() {
    var isUsedFlag = 0;
    isUsedFlag = MappingTableSystems.find({
      systemId: this._id,
      tableId: Session.get("editingRecord"),
      activeFlag: true
    }).count();

    if (isUsedFlag > 0) {
      return true
    } else {
      return false
    }
  }
});

Template.mappingSystemItem.events({
  'click .btnSystem': function(e) {

    if (Session.get("editingTable")) {
      Meteor.call('toggleSystem', this._id, Session.get("editingRecord"));
    }
  }
});
