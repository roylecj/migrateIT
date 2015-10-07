Template.settingEntry.onCreated(function() {
  Session.setDefault("connectionState", "");
});

Template.settingEntry.helpers({
    connectionStatus: function() {
      switch (Session.get("connectionState")) {
         case "TESTING":
            return "btn-warning";
            break;
         case "CONNECTED":
            return "btn-success";
            break;
         case "CONNECT_FAILED":
            return "btn-danger";
         case "":
            return "btn-info"
            break;
      }
    },
    connectionIcon: function() {
      switch (Session.get("connectionState")) {
         case "TESTING":
            return "glyphicon-random";
            break;
         case "CONNECTED":
            return "glyphicon-ok";
            break;
         case "CONNECT_FAILED":
            return "glyphicon-refresh";
         case "":
            return "glyphicon-flash"
            break;
      }
    },
    connectionText: function() {
      switch (Session.get("connectionState")) {
         case "TESTING":
            return "Connecting...";
            break;
         case "CONNECTED":
            return "Connected";
            break;
         case "CONNECT_FAILED":
            return "Connection Failed";
            break;
         case "":
            return "Test Connection"
            break;

      }
    }
});

Template.settingEntry.events({
  'click .btnSaveDetails': function(e) {
    e.preventDefault();
  },
  'click .btnTestConnection': function(e) {
    e.preventDefault();

    Session.set("connectionState", "TESTING");

    // Try and connect

    Session.set("connectionState", "CONNECTED");
  },
  'keyup .mappingEndpointIP': function(e, d) {
    Session.set("connectionState", "");
  },
  'keyup .mappingEndpointPort': function(e, d) {
    Session.set("connectionState", "");
  }
});
