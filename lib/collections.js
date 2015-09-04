// Collections

MappingTables = new Mongo.Collection("mappingTables");

MappingTables.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

MappingTableItems = new Mongo.Collection("mappingTableItems");

MappingTableItems.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

ErrorReports = new Mongo.Collection("errorReports");

ErrorReports.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

AuditInfo = new Mongo.Collection("migrationAudit");

AuditInfo.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

/*
Meteor.methods({
  updateServerData: function(newServer) {
    // Switch all off.
    ServerList.update({activeFlag: true}, {$set: {activeFlag: false}}, {multi: true});
    ServerList.update({serverName: newServer}, {$set: {activeFlag: true}});
  },
  clearSearchResponse: function(sessionId) {
    SearchResponse.remove({searchSession: sessionId});
  }
});
*/

Meteor.methods({
  addMappingTable: function(tableName, description) {
    MappingTables.insert({
      tableName: tableName,
      description: description,
      activeFlag: true,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });
  },
  addMappingTableItem: function(tableId, oldCode, newCode){
     // This will add a new item to the list

     MappingTableItems.insert({
       tableId: tableId,
       oldCode: oldCode,
       newCode: newCode,
       activeFlag: true,
       createdBy: Meteor.user().username,
       createdAt: new Date()
     });
  },
  removeMappingTableItem: function(itemId) {
// Deactivate the items, instead of removing them...

    MappingTableItems.update({_id:itemId}, {$set:{
      activeFlag: false,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

  },
  removeMappingTable: function(tableId) {
    MappingTables.update({_id: tableId}, {$set: {
      activeFlag: false,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});
  },
  updateMappingTableItem: function(newItem) {
    MappingTableItems.update({_id: newItem.id}, {$set: {
      oldCode: newItem.oldCode,
      newCode: newItem.newCode,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});
  },
  updateMappingTable: function(tableDetails) {
    MappingTables.update({_id: tableDetails.id}, {$set: {
      tableName: tableDetails.tableName,
      description: tableDetails.description,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});
  }
});

validateTableItem = function(tableId, oldCode, newCode) {
  var errors = {};

  var cntOld;

  cntOld = MappingTableItems.find({tableId: tableId, oldCode: oldCode, activeFlag: true}).count();

  console.log("countOld=" + cntOld);

  if (cntOld > 0) {
    errors.oldCode = "Old code '" + oldCode + "' has already been mapped";
  }

  if (!oldCode) {
    errors.missingOldCode = "Old code cannot be blank";
  }

  if (!newCode) {
    errors.missingNewCode = "New code cannot be blank";
  }

  if (oldCode === newCode) {
    errors.sameCode = "Old code and New code cannot be the same";
  }

  return errors;
}

validateExistingItem = function(itemId, oldCode, newCode) {
  var errors = {};

  var cntOld;
  var tableId = "";

  tableInfo = MappingTableItems.findOne({_id: itemId});

  cntOld = MappingTableItems.find({
      tableId: tableInfo.tableId,
      oldCode: oldCode,
      activeFlag: true,
      _id: { $ne: itemId}
    }).count();

  console.log("countOld=" + cntOld);

  if (cntOld > 0) {
    errors.oldCode = "Old code '" + oldCode + "' has already been mapped";
  }

  if (!oldCode) {
    errors.missingOldCode = "Old code cannot be blank";
  }

  if (!newCode) {
    errors.missingNewCode = "New code cannot be blank";
  }

  if (oldCode === newCode) {
    errors.sameCode = "Old code and New code cannot be the same";
  }

  return errors;
}
