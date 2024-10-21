import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ListAlt as ListAltIcon } from "@mui/icons-material";
import { useTracker } from "meteor/react-meteor-data";
import ProfilMenu from "./ProfilMenu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

export function MenuBar({}) {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  if (user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              to="/tasks" component={Link}
            >
              <ListAltIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rita's To-Do Liste
            </Typography>

            <ProfilMenu></ProfilMenu>

          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return null;
}
