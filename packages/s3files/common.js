export const S3Files = new FilesCollection({
    debug: true,
    collectionName: "S3Files",
    storagePath: "/tmp",
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
      // Allow upload files under 30MB
      if (file.size <= 30485760) {
        return true;
      }
      return "File size may not exceed 30MB";
    },
  
    protected: async function (fileRef) {
      if (!fileRef) return false;
  
      const user = await this.userAsync();
  
      if (!user) {
        return false;
      }
  
      // Check if the current user is the owner of the file
      return fileRef.userId === user._id;
    },
  });
  