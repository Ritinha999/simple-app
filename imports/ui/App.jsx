import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { Ueberschrift2 } from "./Ueberschrift2";
import { Ueberschrift } from "./Ueberschrift";
import { Bewertung } from "./Bewertung";
import { ListAlt as ListAltIcon } from '@mui/icons-material';

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
        <div className="app-header" style={{ display: 'flex', alignItems: 'center' }}>
          <ListAltIcon sx={{ fontSize: 40, mr: 2 }} />  {/* Icon vor dem Text */}
          <Ueberschrift2 title="Rita's To-Do List" />
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

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
