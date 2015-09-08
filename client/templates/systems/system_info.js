Template.systemInfo.onCreated(function() {
  Session.setDefault("editItem", "");
});
Template.systemInfo.helpers({
  editItem: function(viewState) {
    console.log("editItem " + this._id);

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

console.log("saving edit - " + systemName);
    Meteor.call('updateSystem', itemId, systemName);
    Session.set("editItem", "");
  },
  'click .btnCancelEdit': function(e) {

    // Don't need to do anything special
    Session.set("editItem", "");
  }

});
