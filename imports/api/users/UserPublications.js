/**
 * Auto-Publish addional user fields
 */
Meteor.publish(null, async function () {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { profilePictureId: 1 } }
  );
});
