import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { LoadingScreen } from "./LoadingScreen";
import { useTasks } from "./useTasks";

export const TaskManager = ({}) => {
  // tasks und setTasks werden als Props übergeben
  const [text, setText] = useState("");

  const { tasks, loading } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    setText("");

    Meteor.call("tasks.insert", text, (err, res) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  };

  const handleCheckboxClick = (task) => {
    Meteor.call("tasks.setIsChecked", task._id, !task.isChecked);
  };

  const handleDeleteClick = (task) => {
    Meteor.call("tasks.remove", task._id);
  };

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        margin: "auto",
        mt: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
      >
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to add new tasks"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ height: "56px" }}
        >
          Add Task
        </Button>
      </Box>

      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(task)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.isChecked}
                tabIndex={-1}
                disableRipple
                onClick={() => handleCheckboxClick(task)}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.text}
              sx={{ textDecoration: task.isChecked ? "line-through" : "none" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
