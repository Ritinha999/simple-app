import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { LoginWithGithub } from './LoginWithGithub';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
      >
        <Typography 
        variant="h4" 
        align="center" 
        sx={{
          fontWeight: 'bold', 
          color: 'primary.main',  // Verwende die Primärfarbe der App
          mb: 3, // Margin-Bottom, um Abstand zu schaffen
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
      </Box>
    </Container>
  );
};
