import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export const FileDisplay = ({ fileId }) => {
  const [fileUrl, setFileUrl] = useState(null);

  /**
   * Effect hook to get the file URL from the server
   */
  useEffect(() => {
    if (fileId) {
      Meteor.call("s3files.getUrl", fileId, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          setFileUrl(result);
        }
      });
    }
  }, [fileId]);

  return (
    <>
      {fileUrl ? (
        <div>
          <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: "100%" }} />
        </div>
      ) : (
        <Typography variant="body2">Loading...</Typography>
      )}
    </>
  );
};
