import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import { LoginForm } from "./LoginForm";
import { Ueberschrift } from "./Ueberschrift";
import { Box, Typography } from '@mui/material';
import { TaskManager } from "./TaskManager";


const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);
};

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const filter = hideCompleted ? { isChecked: { $ne: true } } : {};

  /**
   * isLoading ist eine Funktion, die true zurückgibt, wenn die Subscription noch nicht abgeschlossen ist.
   */
  const isLoading = useSubscribe("tasks");

  const tasks = useTracker(() => TasksCollection.find(filter).fetch());

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(filter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const logout = () => Meteor.logout();

  if (isLoading()) {
    return <div className="loading">loading...</div>;
  }

  /* <Bewertung label="Ist die App super?" /> */

  return (
    <div className="app">
      <header>
        <div className="app-bar">
        <div className="app-header" style={{ display: 'flex', }}>
          <Ueberschrift>Rita's To-Do Liste</Ueberschrift>
        </div>
        </div>
      </header>
      <Box className="main" sx={{ padding: 4 }}>
      {user ? (
        <Fragment>
          <Box className="user" sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Typography variant="h6" component="div" sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={logout}
            // Hallo du da, ich bin ein Kommentar
            >
              Username: {user.username}
            </Typography>
          </Box>

          <TaskManager tasks={tasks} />

        </Fragment>
      ) : (
        <LoginForm />
      )}
    </Box>
    </div>
  );
};
