Template.mappingItems.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});

Template.mappingItems.onCreated(function() {
  Session.setDefault("textChanged", false);
  Session.setDefault("editItem", "");
  Session.setDefault("includeOldMappings", false);
  Session.setDefault("sortOrder", 1);
  Session.setDefault("columnSort", "oldCode");
  Session.setDefault("editingRecord", this._id);
});

Template.mappingItems.helpers({
  showActiveRecord: function() {
    if (this.activeFlag) {
      return ""
    } else {
      return "text-muted"
    }
  },
  currentEntry: function() {
    return {
      _id: this._id,
      title: this.tableName}
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
  },
  canAdd: function() {
    var loggedInUser = Meteor.user().username;
    var perms = ['add', 'edit', 'remove','admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return true;
    } else {
      return false;
    }
  },
  canEdit: function() {
    var loggedInUser = Meteor.user().username;
    var perms = ['edit', 'remove','admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return true;
    } else {
      return false;
    }
  },
  canRemove: function() {
    var loggedInUser = Meteor.user().username;
    var perms = ['remove','admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {
      return true;
    } else {
      return false;
    }
  },
  mappingTableItems: function() {

    var sortOrder;
    var sortQueryString = {};

    sortOrder = Session.get("sortOrder");
    sortColumn = Session.get("columnSort");

    var sortQuery;
    sortQueryString = "{\"" + sortColumn + "\":" + sortOrder + "}"
    var sortQuery = JSON.parse(sortQueryString);
    var oldSearch = Session.get("oldCodeSearchString");
    var newSearch = Session.get("newCodeSearchString");

    var includeOldMappings;

    includeOldMappings = Session.get("includeOldMappings");

    if (includeOldMappings) {
      if (oldSearch) {
        if (newSearch) {
          return MappingTableItems.find({
            tableId: this._id,
            oldCode: {$regex: oldSearch, $options: 'i'},
            newCode: {$regex: newSearch, $options: 'i'},
          }, {sort: sortQuery} );
        } else {
          return MappingTableItems.find({
            tableId: this._id,
            oldCode: {$regex: oldSearch, $options: 'i'}
          }, {sort: sortQuery} );
        }
      }
      else {
        if (newSearch) {

          return MappingTableItems.find({
            tableId: this._id,
            newCode: {$regex: newSearch, $options: 'i'}
          }, {sort: sortQuery});
        } else {
        return MappingTableItems.find({tableId: this._id}, {sort: sortQuery});
      }}

    } else {
      if (oldSearch) {
        if (newSearch) {
          return MappingTableItems.find({
            tableId: this._id,
            oldCode: {$regex: oldSearch, $options: 'i'},
            newCode: {$regex: newSearch, $options: 'i'},
            activeFlag: true
          }, {sort: sortQuery} );
        } else {
          return MappingTableItems.find({
            tableId: this._id,
            oldCode: {$regex: oldSearch, $options: 'i'},
            activeFlag: true
          }, {sort: sortQuery} );
        }
      }
      else {
        if (newSearch) {

          return MappingTableItems.find({
            tableId: this._id,
            newCode: {$regex: newSearch, $options: 'i'},
            activeFlag: true
          }, {sort: sortQuery});
        } else {
        return MappingTableItems.find({tableId: this._id, activeFlag: true}, {sort: sortQuery});
      }}

    }
  },
  activeRecord: function() {
    return this.activeFlag;
  },
  sortOrderColumn: function(colName) {
    if (Session.get("columnSort") === colName) {
      if (Session.get("sortOrder") === 1) {
        return "glyphicon-arrow-up"
      } else {
        return "glyphicon-arrow-down"
      }
    } else {
      return " hide "
    }

  },
  editingTable: function() {
    return Session.get("editingTable");
  },
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
  },
  includeOld: function() {
    if (Session.get("includeOldMappings")) {
      return "btn-success"
    } else {
      return "btn-info"
    }
  },
  oldMappingText: function() {
    if (Session.get("includeOldMappings")) {
      return "Inactive Mappings Included"
    } else {
      return "Include Inactive Mappings"
    }
  },
  textChanged: function() {
    if (Session.get("textChanged")) {
      return " "
    } else {
      return " hide "
    }
  },
  oldSeach: function() {

  },
  systems: function() {
    return SystemDetails.find({activeFlag: true});
  }
});

Template.mappingItems.events({
  'keypress .oldCodeInput': function(e) {

    Session.set("textChanged", true);
    Session.set("editItem", "");
  },
  'keypress .newCodeInput': function(e) {

    Session.set("textChanged", true);
    Session.set("editItem", "");
  },
  'keyup .oldCodeSearch': function(e) {
    // We need to set the search string...
    var oldSearchString = "";

    oldSearchString = e.target.value;

    Session.set("oldCodeSearchString", oldSearchString);
  },
  'keyup .newCodeSearch': function(e) {
    var newSearchString = "";

    newSearchString = e.target.value;

    Session.set("newCodeSearchString", newSearchString);
  },
  'click .btnDownload': function(e) {
    // We can download the mappings here

    console.log("downloading...");
    Router.go('mappingDownload', {_id: this._id, title: this.tableName});

//    Meteor.call('saveExcel', this.tableName);
  },
  'click .btnReinstate': function(e) {
    var tableId;

    tableId = $(e.target.parentNode.parentNode).find('[name=mappingId]').text();

    var newItem = {};
    newItem.id = tableId;
    newItem.oldCode = $(e.target.parentNode.parentNode).find('[name=mappingOldCode]').text();
    newItem.newCode = $(e.target.parentNode.parentNode).find('[name=mappingNewCode]').text();

    var errors = validateExistingItem(newItem.id, newItem.oldCode, newItem.newCode);

    if (errors.oldCode || errors.missingOldCode || errors.missingNewCode || errors.sameCode) {
      if (errors.oldCode) {
        sAlert.error(errors.oldCode);
      }

      if (errors.missingOldCode) {
        sAlert.error(errors.missingOldCode);
      }

      if (errors.missingNewCode) {
        sAlert.error(errors.missingNewCode);
      }

      if (errors.sameCode) {
        sAlert.error(errors.sameCode);
      }
      return;
    } else {
//        console.log("reinstating item");
        Meteor.call("reinstateMappingTableItem", tableId);
    }
  },
  'click .mappingOld': function(e) {

    var loggedInUser = Meteor.user().username;
    var perms = ['edit', 'remove','admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {

    var itemId = $(e.target.parentNode).find('[name=mappingId]').text();

    if (itemId) {
      Session.set("editItem", itemId);
      }
    }
  },
  'click .btnMaps': function(e) {
//    console.log("old maps clicked");

    if (Session.get("includeOldMappings")) {
      Session.set("includeOldMappings", false);
    } else {
      Session.set("includeOldMappings", true);
    }
  },
  'click .mappingNew': function(e) {
    var loggedInUser = Meteor.user().username;
    var perms = ['edit', 'remove','admin'];
    var valid = Meteor.apply('checkPermission', [loggedInUser, perms], { returnStubValue: true });

    if (valid) {

    var itemId = $(e.target.parentNode).find('[name=mappingId]').text();

    if (itemId) {
      Session.set("editItem", itemId);
      }
    }
  },
  'click .btnEdit': function(e) {
    Session.set("editingTable", true);
    Session.set("editingRecord", this._id);
  },
  'click .btnSave': function(e) {
    Session.set("editingTable", false);

    // We can edit the name of the table and the description

    var mappingTableDetails = {};

    mappingTableDetails.id = this._id;
    mappingTableDetails.tableName = $(e.target.parentNode.parentNode.parentNode.parentNode.parentNode).find('[name=newTableName]').val();
    mappingTableDetails.description = $(e.target.parentNode.parentNode.parentNode.parentNode.parentNode).find('[name=newTableDescription]').val();

    Meteor.call('updateMappingTable', mappingTableDetails);
  },
  'click .btnCancel': function(e) {
    Session.set("editingTable", false);
  },
  'click .btnRemove': function(e) {
//    console.log(e.target.parentNode.parentNode);

    var itemId;

//    debugger

    itemId = $(e.target.parentNode.parentNode).find('[name=mappingId]').text();

    Meteor.call('removeMappingTableItem', itemId);

//    console.log('after removal');

  },
  'click .btnAddCancel': function(e) {
    Session.set("textChanged", false);

    // Clear out the fields..

    $(e.target.parentNode.parentNode).find('[name=oldCodeInput]').val("");
    $(e.target.parentNode.parentNode).find('[name=newCodeInput]').val("");

  },
  'click .btnEditCancel': function(e) {

    // Clear out the edited item...
    Session.set("editItem", "");
  },
  'click .btnEditSave': function(e) {

    var itemId;
    var newItem = {};

    itemId = $(e.target.parentNode.parentNode).find('[name=mappingId]').text();

    newItem.id = itemId;
    newItem.oldCode = "";
    newItem.newCode = "";
    newItem.oldCode = $(e.target.parentNode.parentNode).find('[name=oldCodeEdit]').val();
    newItem.newCode = $(e.target.parentNode.parentNode).find('[name=newCodeEdit]').val();

    var errors = validateExistingItem(newItem.id, newItem.oldCode, newItem.newCode);

    if (errors.oldCode || errors.missingOldCode || errors.missingNewCode || errors.sameCode) {
      if (errors.oldCode) {
        sAlert.error(errors.oldCode);
      }

      if (errors.missingOldCode) {
        sAlert.error(errors.missingOldCode);
      }

      if (errors.missingNewCode) {
        sAlert.error(errors.missingNewCode);
      }

      if (errors.sameCode) {
        sAlert.error(errors.sameCode);
      }
      return;
    } else {
        Meteor.call('updateMappingTableItem', newItem );
        // Clear out the item
        Session.set("editItem", "");
    }
  },
  'click .oldCodeHeader': function(e) {
      if (Session.get("columnSort") === "oldCode") {
        if (Session.get("sortOrder") === 1) {
          Session.set("sortOrder", -1)
        } else {
          Session.set("sortOrder", 1)
        }
      } else {
        Session.set("columnSort", "oldCode");
        Session.set("sortOrder", 1);
      }
  },
  'click .newCodeHeader': function(e) {
    if (Session.get("columnSort") === "newCode") {
      if (Session.get("sortOrder") === 1) {
        Session.set("sortOrder", -1)
      } else {
        Session.set("sortOrder", 1)
      }
    } else {
      Session.set("columnSort", "newCode");
      Session.set("sortOrder", 1);
    }
  },
  'click .btnAdd': function(e) {
    // This is adding a new entry into the list...
    var tableId;
    var oldCode;
    var newCode;

    Session.set("textChanged", false);

    tableId = this._id;

    // Need to go two levels up, as we are clicking on the button.
    oldCode = $(e.target.parentNode.parentNode).find('[name=oldCodeInput]').val();
    newCode = $(e.target.parentNode.parentNode).find('[name=newCodeInput]').val();

//    debugger

    console.log('tableId=' + tableId);
    console.log('oldcode=' + oldCode);
    console.log('newCode=' + newCode);

    var errors = validateTableItem(tableId, oldCode, newCode);

    if (errors.oldCode || errors.missingOldCode || errors.missingNewCode || errors.sameCode) {
      if (errors.oldCode) {
        sAlert.error(errors.oldCode);
      }

      if (errors.missingOldCode) {
        sAlert.error(errors.missingOldCode);
      }

      if (errors.missingNewCode) {
        sAlert.error(errors.missingNewCode);
      }

      if (errors.sameCode) {
        sAlert.error(errors.sameCode);
      }
      return;
    } else {
        Meteor.call('addMappingTableItem', tableId, oldCode, newCode);

        // Now clear the fields
        $(e.target.parentNode.parentNode).find('[name=oldCodeInput]').val("");
        $(e.target.parentNode.parentNode).find('[name=newCodeInput]').val("");
    }
  }
});
