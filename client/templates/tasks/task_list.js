Template.taskList.onCreated(function() {
    Session.setDefault("includeCompletedTasks", false);
    Session.setDefault("newRecord", false);
    Session.setDefault("personalTask", true);
});


Template.taskList.helpers({
  tasks: function() {
    var userId = Meteor.user()._id;

    if (Session.get("includeCompletedTasks")) {
      return Tasks.find({user: userId}).fetch();
    } else {
      return Tasks.find({user: userId, completeFlag: false}).fetch();
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
    return Meteor.users.find({ username: { $ne: Meteor.user } }).fetch();
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
  }
});
