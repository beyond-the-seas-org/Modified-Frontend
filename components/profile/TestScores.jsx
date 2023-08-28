import React from 'react';
import {
  Card, CardContent, Typography, AppBar, Toolbar,
  List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CreateIcon from '@mui/icons-material/Create';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import MicIcon from '@mui/icons-material/Mic';

const TestScores = ({ testScores }) => {
  const scoreItems = [
    {
      title: 'GRE Verbal & Quantitative Score',
      score: testScores.gre_verbal_quant_score,
      icon: <AssessmentIcon />,
    },
    {
      title: 'GRE Analytical Writing Assessment (AWA) Score',
      score: testScores.gre_awa_score,
      icon: <CreateIcon />,
    },
    {
      title: 'TOEFL Score',
      score: testScores.toefl_score,
      icon: <SpeakerNotesIcon />,
    },
    {
      title: 'IELTS Score',
      score: testScores.ielts_score,
      icon: <MicIcon />,
    }
  ];

  return (
    <Card elevation={3}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">
            Test Scores
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <List>
          {scoreItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondaryTypographyProps={{ fontWeight: 'bold', color: 'secondary.main' }}
                  primary={item.title}
                  secondary={item.score}
                />
              </ListItem>
              {index !== scoreItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TestScores;
