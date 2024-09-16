import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.methods({
  /**
   * Insert a task into the TasksCollection
   * @param {String} text Text of the task
   */
  async "tasks.insert"(text) {
    check(text, String);
    text = text.trim();

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    if (text === "") {
      throw new Meteor.Error("Text is required.");
    }

    await TasksCollection.insertAsync({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  async "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await TasksCollection.removeAsync(taskId);
  },

  async "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    await TasksCollection.updateAsync(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
