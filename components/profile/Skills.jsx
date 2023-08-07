'use client'
import React from 'react';
import { Box, Typography, Chip, Card, CardContent,AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';


const SkillsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& > :not(style)': {
    margin: theme.spacing(0.5),
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f3f3f3',
  color: '#333',
  '&:hover': {
    backgroundColor: '#ff4081',
    color: '#fff',
  },
}));

const Skills = ({ skills }) => {
  return (
    <Card>
      <CardContent>
      <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              Skills
            </Typography>
          </Toolbar>
        </AppBar>
        <SkillsContainer>
          {/* {skills.map((skill, index) => (
            <SkillChip key={index} label={skill} />
          ))} */}
          <SkillChip label="React" />
          <SkillChip label="Node" />
          <SkillChip label="MongoDB" />
          <SkillChip label="Express" />
          <SkillChip label="JavaScript" />
        </SkillsContainer>
      </CardContent>
    </Card>
  );
};

export default Skills;


