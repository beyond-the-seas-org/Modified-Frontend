'use client'
import React from 'react';
import { Box, Card, CardContent, Typography, AppBar, Toolbar, Avatar, Icon } from '@mui/material';

const ProfessorInfo = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Card>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              Professor Details
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src="path_to_professor_image.jpg" sx={{ width: 80, height: 80, mr: 2 }} />
            <Typography variant="h6">{/* Professor's Name */}Professor John Doe</Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <Icon color="primary">mail_outline</Icon> {/* Replace with suitable icons */}
            <Typography variant="body1" ml={1}>Contact: john.doe@university.edu</Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={1}>
            <Icon color="primary">location_on</Icon>
            <Typography variant="body1" ml={1}>Address: Department of Computer Science, XYZ University, City, Country</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Icon color="primary">library_books</Icon>
            <Typography variant="body1" ml={1}>Field of Interest: Machine Learning, Artificial Intelligence</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfessorInfo;
