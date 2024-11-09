import { S3Files } from "./common.js";

/**
 * Handle file upload to S3. Use this function in a file upload form event handler.
 * @param {*} e Event from file input
 * @param {*} onStart Callback function to run when upload starts, e.g. to set loading state
 * @param {*} onEnd |
 *  Callback function to run when upload ends, e.g. to set file ID.
 *  This function should take two arguments: error and fileObj;
 *  error is null if no error occurred, and fileObj is the uploaded file object.
 */
const handleFileUpload = (
  e,
  { onStart = undefined, onEnd = undefined } = {}
) => {
  e.preventDefault();
  const file = e.target.files[0];
  if (file) {
    const uploadInstance = S3Files.insert(
      {
        file,
        chunkSize: "dynamic",
      },
      false
    );

    uploadInstance.on("start", () => {
      if (onStart) onStart();
    });

    uploadInstance.on("end", (error, fileObj) => {
      if (onEnd) {
        onEnd(error, fileObj);
      }
    });

    uploadInstance.start();
  }
};

export { handleFileUpload, S3Files };
