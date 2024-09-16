import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.publish("tasks", async () => {
  const id = Meteor.userId();
  return TasksCollection.find({ userId: id });
});
