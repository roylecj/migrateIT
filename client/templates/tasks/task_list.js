Template.taskList.onCreated(function() {
    Session.setDefault("includeCompletedTasks", false);
    Session.setDefault("newRecord", false);
    Session.setDefault("personalTask", true);
});

Template.taskList.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});

Template.taskList.helpers({
  tasks: function() {
    var userId = Meteor.user()._id;

    if (Session.get("includeCompletedTasks")) {
      return Tasks.find({user: userId, removedFlag: false}).fetch();
    } else {
      return Tasks.find({user: userId, completeFlag: false, removedFlag: false}).fetch();
    }
  },
  includeCompletedText: function() {
    if (Session.get("includeCompletedTasks")) {
      return "Completed Tasks Included"
    } else {
      return "Include Completed Tasks"
    }
  },
  completeState: function() {
    if (Session.get("includeCompletedTasks")) {
      return "btn-success"
    } else {
      return "btn-info"
    }
  },
  userList: function() {
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
  },
  newRecord: function() {
    return Session.get("newRecord");
  },
  personName: function() {
    return this.profile.name;
  },
  isChecked: function() {
    if (Session.get("personalTask")) {
      return "checked"
    } else {
      return ""
    }
  },
  notPersonalTask: function() {
    return ! Session.get("personalTask")
  },
  personalTaskState: function() {
    if (Session.get("personalTask")) {
      return "btn-info"
    } else {
      return "btn-success"
    }
  },
  personalTaskText: function() {
    if (Session.get("personalTask")) {
      return "Personal Task"
    } else {
      return "Assigned to"
    }
  }
});

Template.taskList.events({
  'click .btnIncludeCompleted': function(e, t) {
    Session.set("includeCompletedTasks", ! Session.get("includeCompletedTasks"));
  },
  'click .btnAddTask': function(e, t) {
    e.preventDefault();
    Session.set("newRecord", true);
  },
  'click .btnPersonalTask': function(e, t) {
    e.preventDefault();
    Session.set("personalTask", ! Session.get("personalTask"));
  },
  'click .btnCancelTask': function(e, t) {
    e.preventDefault();
    Session.set("newRecord", false);
  },
  'click .btnSaveTask': function(e, t) {
    e.preventDefault();
    Session.set("newRecord", false);


    var descriptionText = "";
    var notesText = "";
    var assignedToItem = "";

    var pageHTML;

    pageHTML = e.target.parentNode.parentNode.parentNode.parentNode
    descriptionText = $(pageHTML).find("[name='taskDescription']").val();
    notesText = $(pageHTML).find("[name='taskDetail']").val();

    if (Session.get("personalTask")) {
      assignedToItem = Meteor.userId();
    } else {
      var assignedToUser = $(pageHTML).find("[name='userSelect']").children(":selected").attr("id");
      var assignedTo = Meteor.users.findOne({username: assignedToUser});
      assignedToItem = assignedTo._id;
    }

    var taskDetails = {};

    taskDetails = {
      description: descriptionText,
      notes: notesText,
      user: assignedToItem,
      assignedBy: Meteor.userId()
    }

    Meteor.call("addTask", taskDetails);

    // Display the alert
    sAlert.success("New Task Added");
  }
});
