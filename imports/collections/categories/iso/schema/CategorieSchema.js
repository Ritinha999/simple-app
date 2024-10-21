import SimpleSchema from "meteor/aldeed:simple-schema";

export const TasksSchema = new SimpleSchema({
  text: {
    type: String,
    max: 100,
  },
  isChecked: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
});
