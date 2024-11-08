import React from "react";
import { Typography, Box } from "@mui/material";

/**
 * Just a dummy component to test routing
 * @returns Dummy component
 */
export const Dummy = () => (
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
    Here's nothing to see
  </Typography>
  <Typography variant="h6">at least not yet...</Typography>
</Box>
);
