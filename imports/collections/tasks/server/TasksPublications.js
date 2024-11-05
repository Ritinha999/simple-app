import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../iso/db/TasksCollection";

Meteor.publish("tasks", async () => {
  const id = Meteor.userId();
  return TasksCollection.find({ userId: id });
});
