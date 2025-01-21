import { Meteor } from "meteor/meteor";
import React from "react";
import { LoginForm } from "./LoginForm";
import { Box } from "@mui/material";
import { TaskManager } from "../collections/tasks/client/components/TaskManager";
import { MenuBar } from "./MenuBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dummy } from "./Dummy";
import PrivateRoute from "./PrivateRoute";
import { Account } from "./Account";
import { Categories } from "../collections/categories/client/components/Categories";
import { Navigation } from "./Navigation";
import { AuthProvider } from "./contexts/AuthProvider";

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
      <AuthProvider>
        <Box>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/categories" />} />
              <Route path="/about" element={<Dummy />} />
              <Route path="/login" element={<LoginForm />} />
              <Route element={<PrivateRoute />}>
                <Route path="/chat" element={<Dummy />} />
                <Route path="/settings" element={<Account />} />
                <Route path="/categories" element={<Categories />} />
              </Route>
            </Routes>
            <Navigation />
          </Router>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
};
