'use client';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { parse, format } from 'date-fns';

const AddPublication = ({ closeDialog, refreshPublications }) => {
  // State to manage form fields
  const [venue, setVenue] = useState(''); // Initialize with default value
  const [userSelectedVenue, setUserSelectedVenue] = useState(''); // Initialize with default value
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [doi, setDoi] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [date, setDate] = useState('');
  const [citation, setCitation] = useState('');
  const [showFetchedData, setShowFetchedData] = useState(false);
  const [displaySaveButton, setDisplaySaveButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [user_id, setUser_id] = useState(null);


  useEffect(() => {
    const user_id = localStorage.getItem("id");
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    setUser_id(user_id);
  }, []);

  // Function to handle venue change
  const handleVenueChange = (event) => {
    setVenue(event.target.value);
    if(event.target.value === 'IEEE') {
      setShowSubmitButton(true);
      setDisplaySaveButton(false);
      setShowFetchedData(false);
    }else if(event.target.value === 'Others') {
      setShowSubmitButton(false);
      setDisplaySaveButton(true);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (venue === 'Others') {
      // Handle form submission for 'Others'
      // You can send the form data to your API or perform other actions here
    } else if (venue === 'IEEE') {
      try {
        // Call the API to get IEEE data


        console.log("before calling api")
        const requestData = {
            link: link,
          };

          const response = await fetch('http://127.0.0.1:5001/api/profile/get_ieee_publication_info', {
            method: 'POST', // Use POST method
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(requestData), // Convert the data to JSON and send it in the request body
          });

          console.log("after calling api")


          if (response.ok) {
            const data = await response.json();
      
            setTitle(data.title || '');
            setLink(data.link || '');
            setDoi(data.doi || '');
            setAbstract(data.abstract || '');
            setKeywords(data.keywords || '');
            setDate(data.date_of_publication || '');
            setCitation(data.citations || '');
            setShowFetchedData(true);
            setDisplaySaveButton(true);
            setShowSubmitButton(false);
      
          } else {
          // Handle API error
        }
      } catch (error) {
        // Handle fetch error
      }
    }
  };

  const saveData = async () => {
      const requestData = {
        title: title,
        link: link,
        doi: doi,
        abstract: abstract,
        keywords: keywords,
        date_of_publication: date,
        citations: citation,
        venue: venue,
        student_id: user_id
      };

      const response = await fetch('http://localhost:5002/api/professors/add_student_publication', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestData), // Convert the data to JSON and send it in the request body
      });

      if (response.ok) {
        const data = await response.json();
        refreshPublications();
        alert('Publication added successfully');
        closeDialog();
      }
      else {
        alert('Error in adding publication');
      }
  };

  return (
    <div>
  <div>
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Venue:</FormLabel>
      <RadioGroup
        aria-label="venue"
        name="venue"
        value={venue}
        onChange={handleVenueChange}
      >
        <FormControlLabel value="IEEE" control={<Radio />} label="IEEE" />
        <FormControlLabel value="Others" control={<Radio />} label="Others" />
      </RadioGroup>
    </FormControl>
  </div>

  {/* Add spacing after the radio buttons */}
  <div style={{ marginTop: '16px' }}>
    <Grid container spacing={2}>
      {venue === 'Others' && (
        <>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Venue"
              value={userSelectedVenue}
              onChange={(e) => setUserSelectedVenue(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="DOI"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
          <TextareaAutosize
            required
            minRows={4}
            placeholder="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}
            />

          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Citation"
              type="number"
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </>
      )}
      {venue === 'IEEE' && (
        <>
          <Grid item xs={12}>
            <TextField
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              fullWidth
            />
          </Grid>
        </>
      )}
    </Grid>
  </div>

  {showSubmitButton && (
  <div style={{ marginTop: '16px' }}>
    <Button variant="outlined" color="primary" onClick={handleSubmit}>
      Submit
    </Button>
  </div>)
}

  {showFetchedData && venue === "IEEE" && (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Title" value={title} fullWidth readOnly />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Venue" value={venue} fullWidth readOnly />
            </Grid>

            <Grid item xs={12}>
              <TextField label="DOI" value={doi} fullWidth readOnly />
            </Grid>

            <Grid item xs={12}>
                <TextareaAutosize
                    minRows={4}
                    placeholder="Abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Keywords" value={keywords} fullWidth readOnly />
            </Grid>

            <Grid item xs={12}>
              <TextField value={date} fullWidth readOnly />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Citation" value={citation} fullWidth readOnly />
            </Grid>
          </Grid>
        </div>
      )}

      {displaySaveButton && (
        <div style={{ marginTop: '16px' }}>
          <Button variant="outlined" color="primary" onClick={saveData}>
            Save
          </Button>
        </div>
      )}

</div>

  );
};

export default AddPublication;
