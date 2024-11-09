import { Meteor } from "meteor/meteor";
import { _ } from "meteor/underscore";
import { Random } from "meteor/random";
import stream from "stream";
import { FilesCollection } from "meteor/ostrio:files";
import { S3 } from "@aws-sdk/client-s3"; /* http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html */
/* See fs-extra and graceful-fs NPM packages */
/* For better i/o performance */
import fs from "fs";
import { S3Files } from "./common";

const s3Conf = Meteor.settings.s3 || {};

const bound = Meteor.bindEnvironment((callback) => {
  return callback();
});

let s3;

const initS3 = () => {
  if (
    Meteor.isServer &&
    !(s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket && s3Conf.region)
  )
    throw new Meteor.Error(
      "s3files.no-settings",
      "S3 settings not present. Make sure to add { s3: { key, secret, bucket, region } } to your settings.json."
    );

  s3 = new S3({
    credentials: {
      secretAccessKey: s3Conf.secret,
      accessKeyId: s3Conf.key,
    },
    region: s3Conf.region,
    httpOptions: {
      timeout: 6000,
      agent: false,
    },
  });
};

function setS3Upload(collection, s3folder = "assets") {
  if (!(collection instanceof FilesCollection))
    throw new Meteor.Error(
      "s3files.type-error",
      "Collection must be a FilesCollection"
    );
  if (!(typeof s3folder === "string"))
    throw new Meteor.Error(
      "s3files.type-error",
      "s3folder needs to be a string"
    );

  collection.onAfterUpload = function onAfterUploadReplace(fileRef) {
    onAfterUploadHook(fileRef, collection, s3folder);
  };

  collection.interceptDownload = function interceptDownloadReplace(
    http,
    fileRef,
    version
  ) {
    return interceptDownloadHook(http, fileRef, version, collection, s3folder);
  };

  replaceRemove(collection);
}

function onAfterUploadHook(fileRef, collection, s3folder) {
  if (fileRef.meta?.destination === "tmp" || Meteor.isTest) return;
  // Run through each of the uploaded file
  _.each(fileRef.versions, (vRef, version) => {
    // We use Random.id() instead of real file's _id
    // to secure files from reverse engineering on the AWS client
    const filePath =
      s3folder + "/" + Random.id() + "-" + version + "." + fileRef.extension;

    // Create the AWS:S3 object.
    // Feel free to change the storage class from, see the documentation,
    // `STANDARD_IA` is the best deal for low access files.
    // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
    // Body is the file stream we are sending to AWS
    s3.putObject(
      {
        // ServerSideEncryption: 'AES256', // Optional
        StorageClass: "STANDARD",
        Bucket: s3Conf.bucket,
        Key: filePath,
        Body: fs.createReadStream(vRef.path),
        ContentType: vRef.type,
      },
      (error) => {
        bound(async () => {
          if (error) {
            console.error(error);
          } else {
            // Update FilesCollection with link to the file at AWS
            const upd = { $set: {} };
            upd["$set"]["versions." + version + ".meta.pipePath"] = filePath;
            try {
              await collection.collection.updateAsync(fileRef._id, upd);
              collection.unlink(
                await collection.collection.findOneAsync(fileRef?._id),
                version
              );
            } catch (e) {
              console.error(e);
            }
          }
        });
      }
    );
  });
}

function interceptDownloadHook(http, fileRef, version, collection) {
  let path;

  /** Wenn der Datei nicht in S3 geladen wurde */
  if (fileRef?.meta?.destination === "tmp") return;

  if (
    fileRef &&
    fileRef.versions &&
    fileRef.versions[version] &&
    fileRef.versions[version].meta &&
    fileRef.versions[version].meta.pipePath
  ) {
    path = fileRef.versions[version].meta.pipePath;
  }

  if (path) {
    // If file is successfully moved to AWS:S3
    // We will pipe request to AWS:S3
    // So, original link will stay always secure

    // To force ?play and ?download parameters
    // and to keep original file name, content-type,
    // content-disposition, chunked "streaming" and cache-control
    // we're using low-level .serve() method
    const opts = {
      Bucket: s3Conf.bucket,
      Key: path,
    };

    if (http.request.headers.range) {
      const vRef = fileRef.versions[version];
      let range = _.clone(http.request.headers.range);
      const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
      const start = parseInt(array[1]);
      let end = parseInt(array[2]);
      if (isNaN(end)) {
        // Request data from AWS:S3 by small chunks
        end = start + this.chunkSize - 1;
        if (end >= vRef.size) {
          end = vRef.size - 1;
        }
      }
      opts.Range = `bytes=${start}-${end}`;
      http.request.headers.range = `bytes=${start}-${end}`;
    }

    // Use async/await for getObject
    (async () => {
      try {
        const data = await s3.getObject(opts);
        if (http.request.headers.range && data.ContentRange) {
          // Set proper range header in according to what is returned from AWS:S3
          http.request.headers.range = data.ContentRange.split("/")[0].replace(
            "bytes ",
            "bytes="
          );
        }

        const dataStream = new stream.PassThrough();
        data.Body.pipe(dataStream);

        collection.serve(
          http,
          fileRef,
          fileRef.versions[version],
          version,
          dataStream
        );
      } catch (error) {
        console.error(error);
        if (!http.response.finished) {
          http.response.end();
        }
      }
    })();

    return true;
  }
  // While file is not yet uploaded to AWS:S3
  // It will be served file from FS
  return false;
}

async function replaceRemove(collection) {
  const _origRemove = collection.removeAsync;
  collection.removeAsync = async function (search) {
    const cursor = this.collection.find(search);
    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        if (vRef && vRef.meta && vRef.meta.pipePath) {
          // Remove the object from AWS:S3 first, then we will call the original FilesCollection remove
          s3.deleteObject(
            {
              Bucket: s3Conf.bucket,
              Key: vRef.meta.pipePath,
            },
            (error) => {
              bound(() => {
                if (error) {
                  console.error(error);
                }
              });
            }
          );
        }
      });
    });

    //remove original file from database
    try {
      await _origRemove.call(this, search);
    } catch (e) {
      Meteor.settings.verbose && console.warn(e);
    }
  };
}

/**
 * Get a URL to download a file from S3
 * @param {string} fileId The ID of the file
 * @returns {string} The URL to download the file
 */
Meteor.methods({
  "s3files.getUrl": async function (fileId) {
    if (!this.userId) return;
    const fileObj = await S3Files.collection.findOneAsync({
      _id: fileId,
      userId: this.userId,
    });
    if (fileObj) {
      const url = S3Files.link(fileObj);
      return url;
    }
  },
});

Meteor.startup(() => {
  try {
    initS3();
    setS3Upload(S3Files);
  } catch (e) {
    console.warn(
      "s3files: Error setting up S3 upload. Files will be stored locally on the server. This is probably not what you want."
    );
    console.error(e);
  }
});

export { S3Files, setS3Upload };
