import { TasksCollection } from "../iso/db/CategorieCollection";
import { TasksSchema } from "../iso/schema/TasksSchema";

if (Meteor.isServer) {
    TasksCollection.attachSchema(TasksSchema);
}