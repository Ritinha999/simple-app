import { Meteor } from "meteor/meteor";
import { CategoriesCollection } from "../iso/db/CategoriesCollection";

Meteor.publish("tasks", async () => {
  const id = Meteor.userId();
  return CategoriessCollection.find({ userId: id });
});
