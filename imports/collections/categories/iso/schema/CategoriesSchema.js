import SimpleSchema from "meteor/aldeed:simple-schema";

export const CategoriesSchema = new SimpleSchema({
  title: {
    type: String,
    max: 100,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
  },
  userId: {
    type: String,
  },
  color: {
    type: String,
    required: false,
  },
});
