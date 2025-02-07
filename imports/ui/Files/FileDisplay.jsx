import React from "react";
import { Typography } from "@mui/material";
import { useFileUrl } from "./useFileUrl";

export const FileDisplay = ({ fileId }) => {
  const { fileUrl, loading } = useFileUrl({ fileId });

  return (
    <>
      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : (
        <div>
          <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: 240 }} />
        </div>
      )}
    </>
  );
};
