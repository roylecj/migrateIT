Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('mappingTables'),
      Meteor.subscribe('mappingTableItems'),
      Meteor.subscribe("errorReports"),
      Meteor.subscribe("migrationAudit"),
      Meteor.subscribe("userDirectory"),
      Meteor.subscribe("auditDetails"),
      Meteor.subscribe("systemDetails"),
      Meteor.subscribe("mappingTableSystems"),
      Meteor.subscribe("tasks")
    ];
  }
});

Router.route('/', {name: 'login'});

Router.route('/home', {name: 'home'});
Router.route('/map', {
  name: 'mappingTable'
});

Router.route('/mapAdd', {
  name: 'mappingTableAdd'
});

Router.route('/users', {
  name: 'accounts'
});

Router.route('/users/add', {
    name: 'accountAdd'
});

Router.route('/users/:_id', {
    name: 'accountEdit',
    data: function() {
      return Meteor.users.findOne(this.params._id);
    }
})

Router.route('/settings', {
    name: 'settingEntry'
});

Router.route('/systems', {
    name: 'systemDetails'
});

Router.route('/system/:_id', {
    name: 'systemEdit',
    data: function() {
      return SystemDetails.findOne(this.params._id);
    }
});

Router.route('/errors', {
  name: 'errorReports'
});
Router.route('/audit', {
  name: 'auditInfo'
});
Router.route('/mapping/:_id', {
  name: 'mappingItems',
  data: function() {
    return MappingTables.findOne(this.params._id);
  }
});

Router.route('/tasks', {
  name: 'taskList'
});

/*
Router.route('/mapDownloadTest/:_id/:title', function() {
  this.render('systemDetails', {
    to: "downloadSection"});
  this.next();
});
*/

Router.route('/mappings', function() {
  // This will get a list of mappings for Viaduct to work through

  debugger
  var data = MappingTables.find({activeFlag: true}).fetch();

  var mappingTableList = "";

  data.forEach(function (tableEntry) {

    var tableSystems;

    tableSystems = MappingTableSystems.find({tableId: tableEntry._id, activeFlag: true}).fetch();

    var tableSystemEntry;

    tableSystems.forEach(function (tableSystemEntry) {
      var systemEntry = SystemDetails.findOne({_id: tableSystemEntry.systemId});
      tableName = tableEntry.tableName.toLowerCase() + '_' + systemEntry.systemName.toLowerCase();

      //mappingTableList = mappingTableList + tableName;

      mappingTableEntry = tableName + '/';

      var mappingItems;
      var mapDetails = "";

      mappingItems = MappingTableItems.find({tableId: tableEntry._id}).fetch();

      mappingItems.forEach(function (mappingItem) {
          mapDetails = mapDetails + mappingItem.oldCode + ';' + mappingItem.newCode + '|'
      });

      mappingTableEntry = mappingTableEntry + mapDetails;
      mappingTableList = mappingTableList + mappingTableEntry + '@';
    });
    // var systemEntry = SystemDetails.findOne({_id: tableEntry.systemId});

    // console.log(systemEntry._id);

    //tableName = tableName + systemEntry.systemName;

    //mappingTableList = mappingTableList + tableName;


  });

//  this.response.end(mappingTableList);
  this.response.end(mappingTableList);

}, { name: 'mappings', where: 'server' });

Router.route('/mappingDownload/:_id/:title', function() {
  var data = MappingTableItems.find({tableId: this.params._id}).fetch();
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
  var title = this.params.title;
  var file = Excel.export(title, fields, data);
  var headers = {
    'Content-type': 'application/vnd.openxmlformats',
    'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
  };

  this.response.writeHead(200, headers);
  this.response.end(file, 'binary');
}, { name:'mappingDownload', where: 'server'});
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    this.next();
  }
};

var requireAdmin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('accessDenied');
  }
  }
  else {
    var usrId;

    usrId = Meteor.userId();

    var inRole;

    inRole = Roles.userIsInRole(usrId, ['admin']);
    if (inRole) {
      this.next();
    } else {
      this.render('accessDenied');
    }
  }
}

// Make sure that you are logged in before we start doing this...
Router.onBeforeAction(requireLogin, {except: ['login', 'mappingDownload', 'mappings']});
Router.onBeforeAction(requireAdmin, {only: ['accounts', 'accountAdd', 'systemDetails', 'systemEdit']});
