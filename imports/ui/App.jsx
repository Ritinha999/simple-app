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
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from "@mui/icons-material/ChatBubble";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

export const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FE68B3",
      },
    },
  });

  const [value, setValue] = React.useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <CssBaseline />
        <Router>
          <MenuBar>Rita's To-Do Liste</MenuBar>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/about" element={<Dummy />} />
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/account" element={<Account />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Routes>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              to="/categories"
              component={Link}
              label="Categories"
              icon={<BookmarkIcon />}
            />
            <BottomNavigationAction
              to="/tasks"
              component={Link}
              label="Chat"
              icon={<ChatIcon />}
            />
            <BottomNavigationAction
              to="/account"
              component={Link}
              label="Settings"
              icon={<SettingsIcon />}
            />
          </BottomNavigation>
        </Router>
      </Box>
    </ThemeProvider>
  );
};
