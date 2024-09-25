import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { Box } from "@mui/material";
import { TaskManager } from "./TaskManager";
import { MenuBar } from "./MenuBar";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className="app">
      <MenuBar>Rita's To-Do Liste</MenuBar>
      <Box className="main" sx={{ padding: 4 }}>
        {user ? <TaskManager/> : <LoginForm />}
      </Box>
    </div>
  );
};
