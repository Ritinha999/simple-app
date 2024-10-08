import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { Box } from "@mui/material";
import { TaskManager } from "./TaskManager";
import { MenuBar } from "./MenuBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FF69B4",
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <CssBaseline />
        <MenuBar>Rita's To-Do Liste</MenuBar>
        <Box sx={{ padding: 4 }}>
          {user ? <TaskManager /> : <LoginForm />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
