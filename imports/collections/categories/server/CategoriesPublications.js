import { Meteor } from "meteor/meteor";
import { CategoriesCollection } from "../iso/db/CategoriesCollection";

Meteor.publish("categories", async () => {
  const id = Meteor.userId();
  return CategoriesCollection.find({ userId: id });
});
