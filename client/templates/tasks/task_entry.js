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

    }
});
