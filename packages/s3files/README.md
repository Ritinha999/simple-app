# S3Files

S3Files is a simple, almost zero config package for managing files in Amazon S3.

## Installation

There's no release to atmospherejs yet, so you'll need to clone this to your projects `./packages` folder and run `meteor add bratelefant:s3files`.

## Setup

First of all, you'll need to provide your s3 credentials in your `Meteor.settings` eg. in `settings.json`

```json
{
  "s3": {
    "key": "1234xyz",
    "secret": "xyz1234",
    "bucket": "mysuperbucket",
    "region": "eu-central-1"
  }
}
```

Make sure your meteor app picks up your settings when running: `meteor run --settings  settings.json`.

## Usage

You don't have to add any code on your server side, everything here is already done by this package. Namely. we add
a `ostio:files` collection named `S3Files` and provide a Meteor method called `s3files.getUrl`, which takes a `fileId`
as a parameter and returns the download url for the file.

### How to upload a file

To upload a file, you can import our upload handler and pass your callbacks, to provide some feedback to the user. Here's a
minimal react example

```jsx
import { handleFileUpload } from "meteor/bratelefant:s3files";

export const FileUpload = () => {
  const onStart = () => {
    console.log("Upload is starting");
  };

  const onEnd = (error, fileObj) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Just uploaded", fileObj);
      // Here you can also store fileObj._id in a related object, e.g.
      // Meteor.users.updateAsync(currentUser._id, { $set: { profilePictureId : fileObj._id }})
    }
  };

  const onChange = (e) => handleFileUpload(e, { onStart, onEnd });

  return (<input type="file" onChange={onChange} />);
};
```

### How to download a file

Just call the `s3files.getUrl` Meteor method, with the respective `fileId`. You can package this logic in a react hook for
example like so:

```jsx
import { useEffect, useState } from "react";

export const useFileUrl = ({ fileId }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fileId) {
      Meteor.call("s3files.getUrl", fileId, (error, result) => {
        setLoading(false);
        if (error) {
          console.error(error);
        } else {
          setFileUrl(result);
        }
      });
    }
  }, [fileId]);

  return { fileUrl, loading };
};
```
