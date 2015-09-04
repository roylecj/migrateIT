
if (MappingTables.find().count() === 0) {

  var thisid;

  thisid = MappingTables.insert({
    tableName: 'Sex',
    description: 'Patient Sex',
    activeFlag: true,
    createdAt: new Date(),
    createdBy: 'croyle3@csc.com'
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

  Accounts.createUser({
    username: 'croyle',
    password: '08board',
    email: 'croyle3@csc.com',
    profile: { name: 'Chris Royle'}
  });

}
