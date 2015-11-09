Template.taskEntry.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
});

Template.taskEntry.helpers({
    dateReceived: function() {
      return moment(this.createdAt).fromNow()
    },
    completeDate: function() {
      return moment(this.completedAt).fromNow()
    },
    assignedByUser: function() {
      if (this.assignedBy != this.user) {
        return Meteor.users.findOne({_id: this.assignedBy}).profile.name
      }
    },
    differentAssignee: function() {
      return (this.assignedBy != this.user)
    }
});

Template.taskEntry.events({
    'click .btnMarkComplete': function(e, t) {

        var taskId = "";

        var pageHTML;

        pageHTML = e.target.parentNode.parentNode.parentNode.parentNode

        taskId = $(pageHTML).find("[id='taskId']").text();

        Meteor.call('completeTask', taskId);
    },
    'click .btnReinstate': function(e, t) {
      var taskId = "";

      var pageHTML;

      pageHTML = e.target.parentNode.parentNode.parentNode.parentNode

      taskId = $(pageHTML).find("[id='taskId']").text();

      Meteor.call('reinstateTask', taskId);
    },
    'click .btnDelete': function(e, t) {
      var taskId = "";

      var pageHTML;

      pageHTML = e.target.parentNode.parentNode.parentNode.parentNode

      taskId = $(pageHTML).find("[id='taskId']").text();

      Meteor.call('deleteTask', taskId);
    }
});
