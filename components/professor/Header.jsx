'use client'
import React from 'react';
import { Avatar, Box, Typography, Card, CardContent, Divider, Link } from '@mui/material';

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
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',  // Darkened the shadow
        borderRadius: '15px',
        backgroundColor: 'background.paper'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Avatar and Professor Info */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={professor.image_link}
              sx={{ 
                width: 140, // Made it slightly bigger
                height: 140, 
                border: '4px solid #555', 
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)', // Darkened the shadow
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              }}
            />
            
            <Box sx={{ ml: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>{professor.name}</Typography> {/* Darkened and upsized the font */}
              <Typography variant="subtitle1" color="textSecondary">Associate Professor</Typography>
              <Typography variant="body1" sx={{ mt: 0.5, color: '#2c3e50' }}>Department of Computer Science</Typography> {/* Darkened the font */}
              <Typography variant="body1" sx={{ mt: 0.5, color: '#3498db' }}>{professor.university_name}</Typography>
            </Box>
          </Box>

          {/* Divider */}
          <Divider orientation="vertical" variant="right" flexItem sx={{ mx: 4 }} />

          {/* Contact Info and Address */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Email: {professor.email}</Typography>
            <Typography variant="body1" sx={{ mt: 1, color: '#2c3e50' }}>123 Main St, Pittsburg, USA</Typography>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1" sx={{ mt: 1, color: '#e74c3c', fontWeight: 'medium' }}>
                Website:
              </Typography>
              {professor.professor_website_link_details && professor.professor_website_link_details.website_link ? (
                <Link 
                  href={professor.professor_website_link_details.website_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  sx={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  {professor.professor_website_link_details.website_link}
                </Link>
              ) : (
                <Typography variant="body1" sx={{ mt: 1, color: '#e74c3c', fontWeight: 'medium' }}>
                  Not available
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfessorHeader;
