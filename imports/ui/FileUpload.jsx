import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTracker } from "meteor/react-meteor-data";
import { S3Files } from "meteor/bratelefant:s3files";

export const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadInstance = S3Files.insert(
        {
          file,
          streams: "dynamic",
          chunkSize: "dynamic",
          allowWebWorkers: true,
        },
        false
      );

      uploadInstance.on("start", () => {
        setUploading(true);
        setUploadError(null);
      });

      uploadInstance.on("end", (error, fileObj) => {
        setUploading(false);
        if (error) {
          setUploadError(error);
        } else {
          console.log("File successfully uploaded:", fileObj);
        }
      });

      uploadInstance.start();
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileUpload} />
      {uploading && <Typography variant="body2">Uploading...</Typography>}
      {uploadError && (
        <Typography variant="body2" color="error">
          {uploadError.message}
        </Typography>
      )}
    </>
  );
};
