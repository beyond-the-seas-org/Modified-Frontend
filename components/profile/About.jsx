'use client'
import React from 'react';
import { Box, Card, CardContent, Typography, AppBar, Toolbar } from '@mui/material';

const About = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Card>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              About
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          <Typography variant="body1">Bio: Student</Typography>
          <Typography variant="body1">Education: BSc in Computer Science and Engineering in Buet</Typography>
          <Typography variant="body1">Work Experience: Web Development</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;


