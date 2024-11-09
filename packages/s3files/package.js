Package.describe({
  name: "bratelefant:s3files",
  version: "0.0.1",
  // Brief, one-line summary of the package.
  summary: "Enable simple upload and download of files to and from AWS S3",
  // URL to the Git repository containing the source code for this package.
  git: "",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md",
});

Npm.depends({
  "@aws-sdk/client-s3": "3.676.0",
});

Package.onUse(function (api) {
  api.versionsFrom("2.16");
  api.use("ecmascript");
  api.use("ostrio:files");
  api.mainModule("common.js", ["client", "server"]);
  api.addFiles("server.js", "server");
  api.export("S3Files", ["server", "client"]);
});

Package.onTest(function (api) {
  api.use("ecmascript");
  api.use("tinytest");
  api.use("bratelefant:s3files");
  api.mainModule("s3files-tests.js");
});
