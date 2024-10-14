import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { LoginWithGithub } from "./LoginWithGithub";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

export const LoginForm = () => {
  // Get the location object from the React Router, to redirect the user to the page he wanted to visit before logging in
  const location = useLocation();
  // Get the navigate function from the React Router
  const navigate = useNavigate();

  // Redicret to the page the user wanted to visit before logging in
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (!err) {
        // Redirect to the page the user wanted to visit before logging in
        navigate(from, { replace: true });
      } else {
        // Show an error message
        alert(err.reason);
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center the content horizontally
          gap: 2,
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "primary.main", // Use the primary color of the app
            mb: 3, // Margin-Bottom to create space
          }}
        >
          Log In
        </Typography>

        <LoginWithGithub />

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
        
        <Link to="/about" variant="body2" component={RouterLink}>
          About
        </Link>
      </Box>
    </Container>
  );
};
