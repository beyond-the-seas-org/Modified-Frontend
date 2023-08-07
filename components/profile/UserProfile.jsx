import React from 'react';
import { Avatar, Typography, Grid, Paper } from '@mui/material';

const UserProfile = () => {
  // Replace the below data with your actual user data
  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john.doe@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    bio: 'A passionate developer and tech enthusiast.',
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', maxWidth: '400px' }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar alt={user.name} src={user.avatarUrl} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">@{user.username}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        {user.bio}
      </Typography>
    </Paper>
  );
};

export default UserProfile;
