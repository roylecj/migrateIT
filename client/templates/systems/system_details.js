Template.systemDetails.helpers({
  systems: function() {
    return SystemDetails.find().fetch();
  }
});
