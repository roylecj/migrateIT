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
