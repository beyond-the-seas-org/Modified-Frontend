import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  TextField
} from '@mui/material';
import { Link as MUILink } from '@mui/material';

const OngoingProjectsCard = ({ projects }) => {
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [sliderValue, setSliderValue] = useState(50);


  const fetchMatchingProfiles = async (student_id, funding_id) => {
    try {
      // const response = await fetch(`http://127.0.0.1:5002/api/professors/${student_id}/${funding_id}/get_student_profile_matching`);
      // const data = await response.json();

      const data = ["Hello World"]

      setMatchingProfiles(data);
      setOpenDialog(true);

    } catch (error) {
      console.error("Error fetching matching profiles:", error);
    }
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

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
              label={`Funding Availability: ${ongoingProject.funding ? 'Yes' : 'No'}`}
              variant="outlined"
              color={ongoingProject.funding ? 'primary' : 'secondary'}
              sx={{ marginRight: 1 }}
            />
            <Chip
              label={`Maximum Students: ${ongoingProject.num_of_students}`}
              variant="outlined"
              color="info"
              sx={{ marginRight: 1 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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

              <Button
                variant="contained"
                onClick={() => fetchMatchingProfiles(ongoingProject.student_id, ongoingProject.funding_id)}
                sx={{
                  background: 'linear-gradient(45deg, #3498db 30%, #2c3e50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(52, 152, 219, .3)',
                }}
              >
                Match My Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Popup Dialog */}
      <Dialog
  open={openDialog}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  fullWidth
  maxWidth="md"
>
  <DialogTitle id="alert-dialog-title">{"Matching Profiles"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      {/* Display dummy data or actual data from the state */}
      {
        matchingProfiles ? matchingProfiles.map(profile => (
          <Typography key={profile.id} variant="body1" sx={{ marginBottom: 1 }}>
            {profile.name} - {profile.matchingPercentage}% Match
          </Typography>
        )) : (
          <Typography variant="body2" color="textSecondary">
            No matching profiles found.
          </Typography>
        )
      }
    </DialogContentText>
    <Box sx={{ marginTop: 3 }}>
      <Typography gutterBottom>Matching Threshold: {sliderValue}%</Typography>
      <Slider
        value={sliderValue}
        onChange={(event, newValue) => setSliderValue(newValue)}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={100}
        valueLabelDisplay="auto"
        sx={{
          color: 'linear-gradient(45deg, #FE6B8B 30%, #3498db 90%)',
        }}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary" autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
};

export default OngoingProjectsCard;
