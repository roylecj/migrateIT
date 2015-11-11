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

Meteor.publish('tasks', function() {
    return Tasks.find();
})

Meteor.methods({
  updatePassword: function(userId) {

    var passwd = "";

    // use 8 random characters...

    passwd = Random.hexString(8);

    console.log("new pass=" + passwd);

    // Updating the password to the value
    Accounts.setPassword(userId, passwd);

    return passwd;
  },
  updatePasswordByUser: function(userId, newPasswd) {
    // Updating the password to the value

    var loginId = "";

    var userDetails = Meteor.users.findOne({username: userId});

    loginId = userDetails._id;

    Accounts.setPassword(loginId, newPasswd);

  }
})
