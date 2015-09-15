Meteor.startup(function () {

  UploadServer.init({
    tmpDir: '/uploads/tmp',
    uploadDir: '/uploads/',
    uploadUrl: '/upload/',
    checkCreateDirectories: true,
    overwrite: false
  });
});
