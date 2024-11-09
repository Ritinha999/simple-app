import { useEffect, useState } from "react";

export const useFileUrl = ({ fileId }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to get the file URL from the server
   */
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
