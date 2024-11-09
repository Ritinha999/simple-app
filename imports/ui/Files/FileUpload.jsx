import React, { useState } from "react";
import { Typography } from "@mui/material";
import { handleFileUpload } from "meteor/bratelefant:s3files";
import { FileDisplay } from "./FileDisplay";

/**
 * Ok, this is uuuuuugly, but it works.
 * @returns
 */
export const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFileId, setUploadedFileId] = useState();

  const onStart = () => {
    setUploading(true);
    setUploadError(null);
  };

  const onEnd = (error, fileObj) => {
    setUploading(false);
    if (error) {
      setUploadError(error);
    } else {
      setUploadedFileId(fileObj._id);
    }
  };

  const onChange = (e) => handleFileUpload(e, { onStart, onEnd });

  return (
    <>
      <Typography variant="h6">Upload your profile picture</Typography>
      <input type="file" onChange={onChange} />
      {uploading && <Typography variant="body2">Uploading...</Typography>}
      {uploadError && (
        <Typography variant="body2" color="error">
          {uploadError.message}
        </Typography>
      )}
      {uploadedFileId && <FileDisplay fileId={uploadedFileId} />}
    </>
  );
};
