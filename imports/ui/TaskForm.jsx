import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListSubheader from '@mui/material/ListSubheader';

export const TaskForm = ({ user, tasks = [] }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true); // Für das Collapse Element

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    // Beispielhafter Call (angepasst an deine Meteor-Logik)
    Meteor.call("tasks.insert", text, (err, res) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });

    setText("");
  };

  const handleClick = () => {
    setOpen(!open); // Collapse Toggle
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: 'auto', mt: 3 }}>
      {/* Task Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
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
          sx={{ height: '56px' }} // Gleiche Höhe wie TextField
        >
        </Button>
      </Box>

      {/* Task List with Collapsible Section */}
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Your Tasks
          </ListSubheader>
        }
      >
        {/* Main Task List Header */}
        <InboxIcon onClick={handleClick}>
          <InboxIcon>
            <InboxIcon />
          </InboxIcon>
          <ListItemText primary="Tasks" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </InboxIcon>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Mapping over tasks to display each task */}
            {tasks.map((task, index) => (
              <ListItemButton key={index} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary={task.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};





/*

<Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
            <TaskForm user={user} />
          </Paper>

          <Box className="filter" sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setHideCompleted(!hideCompleted)}
              sx={{ borderRadius: '20px' }}
            >
              {hideCompleted ? "Show All" : "Hide Completed"}
            </Button>
          </Box> */