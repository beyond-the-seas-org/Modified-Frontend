'use client';
import React from 'react';
import { Avatar, Box, Typography, Card, CardContent, Divider } from '@mui/material';

const ProfessorHeader = ({ professor }) => {
  return (
    <Card 
      sx={{ 
        overflow: 'hidden',
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        backgroundColor: 'background.paper'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Avatar and Professor Info */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="https://example-image-url.com/professor.jpg"
              sx={{ 
                width: 120, 
                height: 120, 
                border: '3px solid #555', 
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', 
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              }}
            />
            
            <Box sx={{ ml: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{professor.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Associate Professor</Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>Department of Computer Science</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: '#3498db' }}>{professor.university_name}</Typography>
            </Box>
          </Box>

          {/* Divider */}
          <Divider orientation="vertical" variant="right" flexItem sx={{ mx: 3 }} />

          {/* Contact Info and Address */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Email: {professor.email}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>123 Main St, Pittsburg, USA</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: '#e74c3c' }}>Website: {professor.website_link?.website_link}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfessorHeader;
