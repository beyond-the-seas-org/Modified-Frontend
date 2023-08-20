'use client'
import React from 'react';
import { Avatar, Box, Typography, Button } from '@mui/material';
import { Book } from '@mui/icons-material';

const handleViewPublicationsClick = () => {
  // Handle view publications click
};

const ProfessorHeader = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', padding: 2, display: 'flex', alignItems: 'center' }}>
      
      {/* Avatar */}
      <Avatar
        src="https://example-image-url.com/professor.jpg"
        sx={{ width: 120, height: 120, border: '3px solid #555', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}
      />

      {/* Professor Info */}
      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
        <Typography variant="h4" gutterBottom>Dr. John Smith</Typography>
        <Typography variant="h6" color="textSecondary">Associate Professor</Typography>
        <Typography variant="body1">Department of Computer Science</Typography>
        <Typography variant="body1">XYZ University</Typography>
      </Box>

      {/* Contact Info and Address */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body1">Email: john.smith@example.com</Typography>
        <Typography variant="body1">Phone: +123-456-7890</Typography>
        <Typography variant="body1">123 Main St, City, Country</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Book />}
          onClick={handleViewPublicationsClick}
          sx={{ mt: 2 }}
        >
          View Publications
        </Button>
      </Box>
    </Box>
  );
};

export default ProfessorHeader;
