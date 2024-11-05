import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from "@mui/icons-material/ChatBubble";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

export const Navigation = () => (
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
);
