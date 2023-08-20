'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';

function ProfessorDetails() {
  // You can expand on these state values as required
  const [professor, setProfessor] = useState({});
  const [publications, setPublications] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [fundingOpportunities, setFundingOpportunities] = useState([]);
  const [matchScore, setMatchScore] = useState(5); // Example value

  useEffect(() => {
    // Fetch professor details, publications, projects, and funding opportunities here
  }, []);

  return (
    <Box p={3}>
      <Box mb={3}>
        <Typography variant="h4">{professor.name}</Typography>
        <Typography variant="subtitle1">{professor.contact}</Typography>
        <Typography variant="subtitle2">{professor.address}</Typography>
      </Box>

      <Box display="flex" mb={3}>
        <Box flex={1} pr={2}>
          <Typography variant="h6">Research Profile</Typography>
          <Typography>{professor.researchProfile}</Typography>

          <Typography variant="h6">Publication Count</Typography>
          <Typography>{professor.publicationCount}</Typography>

          <Typography variant="h6">H-index</Typography>
          <Typography>{professor.hIndex}</Typography>

          <Typography variant="h6">Field of Interest</Typography>
          <Typography>{professor.fieldOfInterest}</Typography>

          <Typography variant="h6">Working Area</Typography>
          <Typography>{professor.workingArea}</Typography>
        </Box>

        <Box flex={1} pl={2}>
          <Typography variant="h6">Publication Links</Typography>
          <ul>
            {publications.map(pub => (
              <li key={pub.id}><a href={pub.link}>{pub.title}</a></li>
            ))}
          </ul>

          <Typography variant="h6">Ongoing Projects</Typography>
          <ul>
            {ongoingProjects.map(project => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Funding Opportunities</Typography>
        {fundingOpportunities.map(fund => (
          <Box key={fund.id} p={2} borderColor="grey.300" border={1} borderRadius={2} mb={2}>
            <Typography>{fund.title}</Typography>
            <Typography variant="body2">{fund.details}</Typography>
          </Box>
        ))}
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Button variant="contained" color="primary">
          Add to Shortlist
        </Button>
        
        <Box>
          <Typography variant="h6">Profile Matching</Typography>
          <LinearProgress variant="determinate" value={(matchScore / 10) * 100} />
          <Typography>{matchScore} / 10</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfessorDetails;
