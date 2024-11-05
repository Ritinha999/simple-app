import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from "@mui/icons-material/ChatBubble";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";


export const Navigation = () => {

  const [value, setValue] = React.useState(0);
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return null;
  }

  return (
    <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    sx={{ width: "100%", position: "fixed", bottom: 0, padding: 5}}
  >
    <BottomNavigationAction
      to="/categories"
      component={Link}
      label="Categories"
      icon={<BookmarkIcon />}
    />
    <BottomNavigationAction
      to="/chat"
      component={Link}
      label="Chat"
      icon={<ChatIcon />}
    />
    <BottomNavigationAction
      to="/settings"
      component={Link}
      label="Settings"
      icon={<SettingsIcon />}
    />
  </BottomNavigation>
  )
}
