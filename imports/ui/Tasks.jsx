import React from "react";
import { Task } from './Task';
import {  } from '@mui/icons-material';

export const Tasks = ({ tasks, toggleChecked, deleteTask }) => {
    return (
        <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>  )
            }

