Meteor.methods({
  "users.updateProfilePicture": async function (fileId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await Meteor.users.updateAsync(this.userId, {
      $set: { profilePictureId: fileId },
    });
  },
});
