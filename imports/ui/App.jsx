import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { Ueberschrift } from "./Ueberschrift";
import { Bewertung } from "./Bewertung"; 
import { ListAlt as ListAltIcon } from '@mui/icons-material';
import { Tasks } from "./Tasks";

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);

  /* TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  }); */
};

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

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
          <Ueberschrift>Rita's To-List</Ueberschrift>
        </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              username: {user.username}
            </div>

            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            <Tasks tasks={tasks} toggleChecked={toggleChecked} deleteTask={deleteTask}/>

          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
