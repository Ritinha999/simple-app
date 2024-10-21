import { Meteor } from "meteor/meteor";
import 'meteor/aldeed:collection2/dynamic';
import 'meteor/aldeed:collection2/static';
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/collections/tasks/iso/db/TasksCollection";
import "/imports/collections/tasks/server/TasksInit";
import "/imports/collections/tasks/server/TasksMethods";
import "/imports/collections/tasks/server/TasksPublications";

Collection2.load();

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  const user = await Meteor.users.findOneAsync({
    username: SEED_USERNAME,
  });

  if (!user) {
    Accounts.createUserAsync({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
