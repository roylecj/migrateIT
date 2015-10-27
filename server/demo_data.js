
 if (MappingTables.find().count() === 0) {

  var thisid;
  var userId = Accounts.createUser({
    username: 'croyle',
    password: '08board',
    email: 'croyle3@csc.com',
    profile: { name: 'Chris Royle'}
  });

  var userId2 = Accounts.createUser({
    username: 'ibell',
    password: '08board',
    email: 'ibell@csc.com',
    profile: { name: 'Ian Bell'}
  });

  Roles.createRole('admin');
  Roles.createRole('view');
  Roles.createRole('edit');
  Roles.createRole('add');
  Roles.createRole('remove');

  Roles.addUsersToRoles(userId, ['admin']);

  var wpid = SystemDetails.insert({
    systemName: 'webPAS',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle'
  });

  var ugid = SystemDetails.insert({
    systemName: 'UltraGenda',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle'
  });

  thisid = MappingTables.insert({
    tableName: 'Sex',
    description: 'Patient Sex',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com'
  });

  MappingTableSystems.insert({
    tableId: thisid,
    systemId: wpid,
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle'
  });

  MappingTableSystems.insert({
    tableId: thisid,
    systemId: ugid,
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle'
  });

  MappingTableItems.insert({
    tableId: thisid,
    oldCode: '1',
    newCode: 'M',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com'
  });

  MappingTableItems.insert({
    tableId: thisid,
    oldCode: '2',
    newCode: 'F',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com'
  });

  MappingTableItems.insert({
    tableId: thisid,
    oldCode: '0',
    newCode: 'U',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com'
  });

  Tasks.insert({
    user: userId,
    description: 'Need to setup new mapping table for Religion codes.',
    notes: 'This is some more information about the task that we need to do',
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com',
    assignedBy: userId2,
    seenFlag: false,
    completeFlag: false,
    removedFlag: false
  });

  Tasks.insert({
    user: userId,
    description: 'Another task for something',
    notes: 'This is some more information about the task that we need to do',
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com',
    assignedBy: userId,
    seenFlag: true,
    completedAt: new Date(),
    completeFlag: true,
    removedFlag: false
  });
}
