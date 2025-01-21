// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by s3files.js.
import { name as packageName } from "meteor/bratelefant:s3files";

// Write your tests here!
// Here is an example.
Tinytest.add('s3files - example', function (test) {
  test.equal(packageName, "s3files");
});
