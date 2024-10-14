import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { Box } from "@mui/material";
import { TaskManager } from "./TaskManager";
import { MenuBar } from "./MenuBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Dummy } from "./Dummy";
import PrivateRoute from "./PrivateRoute";

export const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FE68B3",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <CssBaseline />
        <MenuBar>Rita's To-Do Liste</MenuBar>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/about" element={<Dummy />} />
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<TaskManager />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};
