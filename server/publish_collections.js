Meteor.publish('mappingTables', function() {
    return MappingTables.find();
});

Meteor.publish('mappingTableItems', function() {
    return MappingTableItems.find();
});

Meteor.publish('errorReports', function() {
    return ErrorReports.find();
});

Meteor.publish('migrationAudit', function() {
    return AuditInfo.find();
});

Meteor.publish("userDirectory", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, roles: 1}});
});

Meteor.publish('auditDetails', function() {
    return AuditDetails.find();
});

Meteor.publish('systemDetails', function() {
    return SystemDetails.find();
});

Meteor.publish('mappingTableSystems', function() {
    return MappingTableSystems.find();
});
