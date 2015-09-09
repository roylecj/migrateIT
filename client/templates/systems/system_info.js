Template.systemInfo.onCreated(function() {
  Session.setDefault("editItem", "");
});
Template.systemInfo.helpers({
  editItem: function(viewState) {

    if (viewState === "edit") {
      if (Session.get("editItem") === this._id) {
        return " "
      } else {
        return " hide "
      }
    } else {
      if (Session.get("editItem") === this._id) {
        return " hide "
      } else {
        return " "
      }
    }
  }
});

Template.systemInfo.events({
  'click .btnEditSystem': function(e) {
    var itemId = $(e.target.parentNode.parentNode.parentNode).find('[name=systemId]').text();

    if (itemId) {
      Session.set("editItem", itemId);

    }
  },
  'click .btnSaveEdit': function(e) {

    var itemId = $(e.target.parentNode.parentNode.parentNode).find('[name=systemId]').text();
    var systemName = $(e.target.parentNode.parentNode.parentNode).find('[name=systemName]').val();

    Meteor.call('updateSystem', itemId, systemName);
    Session.set("editItem", "");
  },
  'click .btnCancelEdit': function(e) {

    // Don't need to do anything special
    Session.set("editItem", "");
  },
  'click .btnRemoveSystem': function(e) {
    var systemId = $(e.target.parentNode.parentNode.parentNode).find('[name=systemId]').text();

    // Check that the table is not used anywhere...

    if (MappingTableSystems.find({systemId: systemId, activeFlag: true}).count() > 0) {
      sAlert.error('System "' + this.systemName + '" is used by a mapping table so cannot be removed, remove table first');
    } else {
      Meteor.call("removeSystem", systemId);
    }
  }

});
