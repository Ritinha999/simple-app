import { CategoriesCollection } from "../iso/db/CategoriesCollection";
import { CategoriesSchema } from "../iso/schema/CategoriesSchema";

if (Meteor.isServer) {
  CategoriesCollection.attachSchema(CategoriesSchema);
}
