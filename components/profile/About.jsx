'use client';
import React from 'react';
import { Box, Card, CardContent, Typography, AppBar, Toolbar, Divider, Paper, Avatar, Icon } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const EducationSegment = ({ title, university, year, cgpa, icon }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
        <Icon>{icon}</Icon>
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight="medium">{title || "Information Not Found"}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>University: {university || "Information Not Found"}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Year of Passing: {year || "Information Not Found"}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>CGPA: {cgpa || "Information Not Found"}</Typography>
      </Box>
    </Paper>
  );
};

const About = ({ aboutInfo = {} }) => { // default to an empty object if aboutInfo is undefined
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Card elevation={5}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              Educational Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Bsc Section */}
          <Box flex={1} mr={2}>
            <EducationSegment
              title="UnderGraduate"
              university={aboutInfo.bsc_university}
              year={aboutInfo.bsc_year_of_passing}
              cgpa={aboutInfo.bsc_cgpa}
              icon={<SchoolIcon />}
            />
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Msc Section */}
          <Box flex={1} ml={2}>
            <EducationSegment
              title="PostGraduate"
              university={aboutInfo.ms_university}
              year={aboutInfo.ms_year_of_passing}
              cgpa={aboutInfo.ms_cgpa}
              icon={<SchoolIcon />}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
