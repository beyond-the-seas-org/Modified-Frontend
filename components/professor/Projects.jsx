'use client';
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import { Link as MUILink } from '@mui/material';

const OngoingProjectsCard = ({ projects }) => {
  return (
    <>
      {projects.map((ongoingProject, index) => (
        <Card
          key={index}
          sx={{
            padding: 3,
            boxShadow: 3,
            borderRadius: '15px',
            backgroundColor: 'background.paper',
            marginBottom: 4,
            mt: 3,
            position: 'relative'
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 1 }}
            >
              {ongoingProject.research_topic}
            </Typography>

            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              Fields: {ongoingProject.research_field}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.2rem' }}>
              {ongoingProject.description}
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Chip
              label={`Funding: ${ongoingProject.funding ? 'Yes' : 'No'}`}
              variant="outlined"
              color={ongoingProject.funding ? 'primary' : 'secondary'}
              sx={{ marginRight: 1 }}
            />
            <Chip
              label={`Students: ${ongoingProject.num_of_students}`}
              variant="outlined"
              color="info"
              sx={{ marginRight: 1 }}
            />

            <div style={{ marginTop: '20px' }}>
              <MUILink
                href={ongoingProject.research_desc_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  }}
                >
                  Read More
                </Button>
              </MUILink>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default OngoingProjectsCard;
