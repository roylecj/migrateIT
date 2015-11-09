Template.systemDetails.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});  
});

Template.systemDetails.helpers({
  systems: function() {
    return SystemDetails.find({activeFlag: true}).fetch();
  },
  addSystem: function() {
    return Session.get("addSystemFlag")
  },
  disableButton: function() {
    if (Session.get("addSystemFlag")) {
      return "disabled"
    } else {
      return ""
    }
  }
});

Template.systemDetails.events({
  'click .btnAddSystem': function(e) {
    Session.set("addSystemFlag", true);
  },
  'click .btnCancelAdd': function(e) {
    Session.set("addSystemFlag", false);
  },
  'click .btnSaveAdd': function(e) {
    // First of all validate it...

    var systemName = "";

    systemName = $(e.target.parentNode.parentNode.parentNode).find('[name=newSystemName]').val();
    var errorFlag = false;

    if (!systemName) {
      sAlert.error('System name is mandatory');
      errorFlag = true;
    }

    if (SystemDetails.find({systemName: {$regex: systemName, $options: 'i'}, activeFlag: true}).count() > 0) {
      sAlert.error('System "' + systemName + '" already exists');
      errorFlag = true;
    }

    if (errorFlag === false) {
      Meteor.call("addSystem", systemName);
      Session.set("addSystemFlag", false);
    }
  }
});
