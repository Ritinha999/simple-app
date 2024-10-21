import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../iso/db/CategorieCollection";

Meteor.publish("tasks", async () => {
  const id = Meteor.userId();
  return TasksCollection.find({ userId: id });
});
