'use client';
import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { Book } from '@mui/icons-material';

const ProfessorHeader = ({ professor }) => {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 2 
      }}
    >
      
      {/* Avatar and Professor Info */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src="https://example-image-url.com/professor.jpg"
          sx={{ width: 120, height: 120, border: '3px solid #555', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}
        />
        
        <Box sx={{ ml: 2 }}>
          <Typography variant="h4">{professor.name}</Typography>
          <Typography variant="h6" color="textSecondary">Associate Professor</Typography>
          <Typography variant="body1">Department of Computer Science</Typography>
          <Typography variant="body1">{professor.university_name}</Typography>
        </Box>
      </Box>

      {/* Contact Info and Address */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography variant="body1">Email: {professor.email}</Typography>
        <Typography variant="body1">123 Main St, Pittsburg, USA</Typography>
        <Typography variant="body1">Website: {professor.website_link?.website_link}</Typography>
      </Box>
    </Box>
  );
};

export default ProfessorHeader;
