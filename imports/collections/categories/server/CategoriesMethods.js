import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { CategoriesCollection } from "../iso/db/CategoriesCollection";

Meteor.methods({
  /**
   * Insert a category into the CategoriesCollection
   * @param {String} title Text of the category
   */
  async "categories.insert"(title) {
    check(title, String);
    title = title.trim();

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    if (title === "") {
      throw new Meteor.Error("Title is required.");
    }

    await CategoriesCollection.insertAsync({
      title,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  async "categories.remove"(id) {
    check(id, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await CategoriesCollection.removeAsync(id);
  },
});
