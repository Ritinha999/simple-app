import { TasksCollection } from "../iso/db/TasksCollection";
import { TasksSchema } from "../iso/schema/TasksSchema";

if (Meteor.isServer) {
    TasksCollection.attachSchema(TasksSchema);
}