import { Meteor } from "meteor/meteor";
import { CategoriesCollection } from "../iso/db/CategoriesCollection";

Meteor.publish("categories", function publishCategories() {
  const id = Meteor.userId();

  if (!id) {
    throw new Meteor.Error("Not authorized.");
  }

  return CategoriesCollection.find({ userId: id });
});
