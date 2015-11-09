Template.mappingTableAdd.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});
Template.mappingTableAdd.helpers({

});

Template.mappingTableAdd.events({
  'click .btnCancelTable': function(e) {
    Router.go('mappingTable');
  },
  'click .btnSaveTable': function(e) {
    // Save the table...

    var tableName;
    var description;

    tableName = $(e.target.parentNode.parentNode.parentNode).find("[name=tableName]").val();
    description = $(e.target.parentNode.parentNode.parentNode).find("[name=description]").val();

    Meteor.call('addMappingTable', tableName, description);

    Router.go('mappingTable');
  }
});
