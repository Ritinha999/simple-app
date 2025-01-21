import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useAuthContext } from "./contexts/AuthProvider";

export const Account = () => {
  const { user, logout } = useAuthContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        My Account
      </Typography>
      <Typography variant="h6">Username:</Typography>
      <Typography variant="body1">{user.username}</Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={logout}
        sx={{ mt: 4 }}
      >
        Log Out
      </Button>
      <FileUpload />
    </Box>
  );
};
