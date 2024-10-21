import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { CategoriesCollection } from "../iso/db/CategoriesCollection";

Meteor.methods({
  /**
   * Insert a task into the TasksCollection
   * @param {String} text Text of the task
   */
  async "categories.insert"(text) {
    check(text, String);
    text = text.trim();

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    if (text === "") {
      throw new Meteor.Error("Text is required.");
    }

    await CategoriesCollection.insertAsync({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  async "categories.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await CategoriesCollection.removeAsync(taskId);
  },

  async "categories.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await CategoriesCollection.updateAsync(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
