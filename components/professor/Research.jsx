'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem } from '@mui/material';

const ResearchProfile = ({ publications, fields }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 2,
        gap: 3  // Spacing between cards
      }}
    >
      
      {/* Field of Interests */}
      <Card 
        variant="outlined"
        sx={{ 
          flex: 1,
          backgroundColor: '#f5f6fa',  // Light gray
          borderRadius: '10px',
          '&:hover': {
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#3498db' }}>Field of Interests:</Typography>
          <List>
            {fields.map((field, index) => (
              <ListItem key={index} sx={{ '&:hover': { backgroundColor: '#eef2f7' } }}>
                <Typography variant="body1">{field}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Publications */}
      <Card 
        variant="outlined" 
        sx={{ 
          flex: 2,
          backgroundColor: '#f5f6fa',  // Light gray
          borderRadius: '10px',
          '&:hover': {
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#e74c3c' }}>Publications:</Typography>
          <List>
            {publications.map((publication, index) => (
              <ListItem key={index} sx={{ '&:hover': { backgroundColor: '#eef2f7' } }}>
                <Typography variant="body1">{publication.title}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      
    </Box>
  );
};

export default ResearchProfile;
