import React from "react";
import { Typography, Box } from "@mui/material";
import { useTracker } from "meteor/react-meteor-data";

export const Account = () => {
  const user = useTracker(() => Meteor.user());

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
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        My Account
      </Typography>
      <Typography variant="h6">Username:</Typography>
      <Typography variant="body1">{user.username}</Typography>
    </Box>
  );
};
