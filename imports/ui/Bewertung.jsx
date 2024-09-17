import React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Bewertung = ({ label }) => {
  const [value, setValue] = React.useState(2);

  return (
    <Box>
      <Typography component="legend">{label}</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};
