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

MappingTableSystems = new Mongo.Collection("mappingTableSystems");

MappingTableSystems.allow({
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

SystemDetails = new Mongo.Collection("systemDetails");

SystemDetails.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return true; },
    update: function(userId, data) { return true; }
});

Tasks = new Mongo.Collection("tasks");

Tasks.allow({
  insert: function(userId, data) { return true; },
  remove: function(userId, data) { return true; },
  update: function(userId, data) { return true; }
});
// UserInfo = new Mongo.Collection(null);

/*
UserInfo.allow({
    insert: function(userId, data) { return true; },
    remove: function(userId, data) { return false; },
    update: function(userId, data) { return true; }
});
*/
AuditDetails = new Mongo.Collection("auditDetails");

AuditDetails.allow({
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
  addMappingTable: function(tableName, description, systems) {
    var mtId = MappingTables.insert({
      tableName: tableName,
      description: description,
      activeFlag: true,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

    if (systems) {
        // Work through each system and look it up, and assign to the Mapping table item
        var numSystems = systems.length;
        systemList = [];

        for (var systemEntry = 0; systemEntry < numSystems; systemEntry++) {
            sysId = SystemDetails.findOne({systemName: systems[systemEntry]});

            MappingTableSystems.insert({
              tableId: mtId,
              systemId: sysId,
              createdAt: new Date(),
              createdBy: Meteor.user().username
            });
            //Do something
        }

    };

    AuditDetails.insert({
      table: 'MappingTable',
      id: mtId,
      action: 'Create mapping table "' + tableName + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });
  },
  addSystem: function(systemName) {
      var sysId = SystemDetails.insert({
        systemName: systemName,
        createdAt: new Date(),
        createdBy: Meteor.user().username,
        activeFlag: true
      });

      AuditDetails.insert({
        table: 'SystemDetails',
        id: sysId,
        action: 'Create system "' + systemName + '"',
        createdAt: new Date(),
        createdBy: Meteor.user().username
      });

  },
  addTask: function(taskDetails) {
      Tasks.insert({
        user: taskDetails.user,
        description: taskDetails.description,
        notes: taskDetails.notes,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        assignedBy: taskDetails.assignedBy,
        seenFlag: false,
        completeFlag: false,
        removedFlag: false
      });
  },
  completeTask: function(taskId) {
      Tasks.update({_id: taskId}, {$set:{
        completeFlag: true,
        completedAt: new Date(),
        seenFlag: true,
        modifiedBy: Meteor.user().username,
        modifiedAt: new Date()
      }});
  },
  deleteTask: function(taskId) {
    Tasks.update({_id: taskId}, {$set:{
      removedFlag: true,
      seenFlag: true,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});
  },
  reinstateTask: function(taskId) {
      Tasks.update({_id: taskId}, {$set:{
        completeFlag: false,
        completedAt: "",
        modifiedBy: Meteor.user().username,
        modifiedAt: new Date()
      }});
  },
  toggleSystem: function(systemId, tableId) {

    // See if it is used first..

    if (MappingTableSystems.find({tableId: tableId, systemId: systemId, activeFlag: true}).count() === 0) {
      // not there...
      if (MappingTableSystems.find({tableId: tableId, systemId: systemId}).count() === 0) {
        MappingTableSystems.insert({
          tableId: tableId,
          systemId: systemId,
          activeFlag: true,
          createdAt: new Date(),
          createdBy: Meteor.user().username
        })
      } else {
        // There is one, but it is inactive... so active it...
        MappingTableSystems.update({tableId: tableId, systemId: systemId}, {$set:{
          activeFlag: true,
          modifiedBy: Meteor.user().username,
          modifiedAt: new Date()
        }});
      }
    } else {
      MappingTableSystems.update({tableId: tableId, systemId: systemId, activeFlag: true}, {$set:{
        activeFlag: false,
        modifiedBy: Meteor.user().username,
        modifiedAt: new Date()
      }});
    }

    AuditDetails.insert({
      table: 'MappingTableSystem',
      id: tableId,
      action: 'Create mapping table system for table id "' + tableId + '",  system "' + systemId + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });
  },
  addMappingTableItem: function(tableId, oldCode, newCode){
     // This will add a new item to the list

     var mtId = MappingTableItems.insert({
       tableId: tableId,
       oldCode: oldCode,
       newCode: newCode,
       activeFlag: true,
       createdBy: Meteor.user().username,
       createdAt: new Date()
     });

     AuditDetails.insert({
       table: 'MappingTableItem',
       id: mtId,
       action: 'Create mapping table item for table id "' + tableId + '",  old code "' + oldCode + '" new code of "' + newCode + '"',
       createdAt: new Date(),
       createdBy: Meteor.user().username
     });

  },
  removeMappingTableItem: function(itemId) {
// Deactivate the items, instead of removing them...

    MappingTableItems.update({_id:itemId}, {$set:{
      activeFlag: false,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'MappingTableItem',
      id: itemId,
      action: 'Removing mapping table item for id "' + itemId + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  removeMappingTable: function(tableId) {
    MappingTables.update({_id: tableId}, {$set: {
      activeFlag: false,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'MappingTable',
      id: tableId,
      action: 'Removing mapping table for id "' + tableId + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  updateMappingTableItem: function(newItem) {

    MappingTableItems.update({_id: newItem.id}, {$set: {
      oldCode: newItem.oldCode,
      newCode: newItem.newCode,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'MappingTableItem',
      id: newItem.id,
      action: 'Updating mapping table item for id "' + newItem.id + '", old code ' + newItem.oldCode + ', new code ' + newItem.newCode,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  reinstateMappingTableItem: function(tableId) {
    MappingTableItems.update({_id: tableId}, {$set: {
      activeFlag: true,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'MappingTableItem',
      id: tableId,
      action: 'Re-instating mapping table item for id "' + tableId + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  updateMappingTable: function(tableDetails) {
    MappingTables.update({_id: tableDetails.id}, {$set: {
      tableName: tableDetails.tableName,
      description: tableDetails.description,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'MappingTable',
      id: tableDetails.id,
      action: 'Updating mapping table for "' + tableDetails.tableName + '", of ' + tableDetails.description,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  checkPermission: function(id, permission) {
    var userId;

    var userDetails;

    userDetails = Meteor.users.findOne({username: id});
    userId = userDetails._id;

    if (Roles.userIsInRole(userId, permission)) {
      return true;
    } else {
      return false;
    }
  },
  addUser: function(loginName, passwd, emailAddress, personName, perms) {

    var userId = Accounts.createUser({
        username: loginName,
        email: emailAddress,
        password: passwd,
        profile: { name:  personName}
    });

    Roles.addUsersToRoles(userId, perms);
  },
  removeUser: function(userId) {
    // Check that the user is a super user

    Meteor.users.remove({username: userId});
  },
  removeSystem: function(systemId) {
    SystemDetails.update({_id: systemId}, {$set: {
      activeFlag: false,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'SystemDetails',
      id: systemId,
      action: 'Removing system for id "' + systemId + '"',
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  updateSystem: function(systemId, systemName) {

    SystemDetails.update({_id: systemId}, {$set: {
      systemName: systemName,
      modifiedBy: Meteor.user().username,
      modifiedAt: new Date()
    }});

    AuditDetails.insert({
      table: 'SystemDetails',
      id: systemId,
      action: 'Updating system for "' + systemId + '", of ' + systemName,
      createdAt: new Date(),
      createdBy: Meteor.user().username
    });

  },
  saveExcel: function(tableId) {
    var data = MappingTableItems.find({tableId: tableId}).fetch();
    var fields = [
      {
        key: 'oldCode',
        title: 'Old Code'
      },
      {
        key: 'newCode',
        title: 'New Code'
      }
    ];

  //  var title = 'Mappings';
    var title = tableId;
    var file = Excel.export(title, fields, data);
    var headers = {
      'Content-type': 'application/vnd.openxmlformats',
      'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
    };

    this.response.writeHead(200, headers);
    this.response.end(file, 'binary');
  }
});

validateTableItem = function(tableId, oldCode, newCode) {
  var errors = {};

  var cntOld;

  cntOld = MappingTableItems.find({tableId: tableId, oldCode: oldCode, activeFlag: true}).count();

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
