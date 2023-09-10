'use client';
import React from 'react';
import { Box, Card, CardContent, Typography, AppBar, Toolbar, Paper, Avatar, Link } from '@mui/material';
import ResearchIcon from '@mui/icons-material/Science';

const ResearchSegment = ({ publication }) => {
    return (
      <Paper elevation={4} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', mb: 2 }}>
        <Avatar sx={{ mr: 3, bgcolor: 'primary.main', width: 60, height: 60 }}>
          <ResearchIcon sx={{ width: 40, height: 40 }} />
        </Avatar>
        <Box flex={1}>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {publication?.title || "Information Not Found"}
          </Typography>
          
          <Box mt={2} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold">Venue: </Typography>
            <Typography variant="subtitle1" ml={1}>
              {publication?.venue || "Information Not Found"}
            </Typography>
          </Box>
  
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              {publication?.abstract || "Information Not Found"}
            </Typography>
          </Box>
  
          <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <Typography variant="body2">
              <strong>Date Published:</strong> {publication?.date ? new Date(publication.date).toLocaleDateString() : "Information Not Found"}
            </Typography>
            <Typography variant="body2">
              <strong>Citation Count:</strong> {publication?.citation !== undefined ? publication.citation : "Information Not Found"}
            </Typography>
            <Typography variant="body2">
              <strong>DOI:</strong> {publication?.doi || "Information Not Found"}
            </Typography>
            <Typography variant="body2">
              <strong>Keywords:</strong> {publication?.keywords || "Information Not Found"}
            </Typography>
          </Box>
  
          {publication?.link && (
            <Box mt={2}>
              <Link href={publication.link} target="_blank" rel="noopener noreferrer" variant="body2">
                <Typography color="primary.main" style={{ textDecoration: 'underline' }}>
                  View Publication
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    );
  };
  

const Research = ({ publication = [] }) => { 
  if (!publication || publication.length === 0) {
    return (
      <Box flex={1} p={2}>
        <Typography variant="h5">
          No research publications available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Card elevation={5}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              Research Publications
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          {publication.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <ResearchSegment publication={item} />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Research;
