
 if (MappingTables.find().count() === 0) {

  var thisid;
  var userId = Accounts.createUser({
    username: 'croyle',
    password: '08board',
    email: 'croyle3@csc.com',
    profile: { name: 'Chris Royle'}
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
}
