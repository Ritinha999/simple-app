import { Meteor } from "meteor/meteor";
import 'meteor/aldeed:collection2/static';
import { Accounts } from "meteor/accounts-base";
import "/imports/collections/tasks/server";
import "/imports/collections/categories/server";

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
