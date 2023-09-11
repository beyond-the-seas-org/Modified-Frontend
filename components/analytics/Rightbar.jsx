'use client'

import {
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Slider,
    Autocomplete,
    TextField,
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Chip,
    Button 

  } from "@mui/material";

  import React, { useState, useEffect } from "react";

  
  const Rightbar = ({mode ,all_fields, show_preferable_locations, refreshLocationlist}) => {
  const [sliderValue, setSliderValue] = useState(50);

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };



  const handleShowPreferableLocationsClick = async() => {

    const postData = {
      preferable_living_cost: sliderValue,
      fields_of_interest: selectedOptions,
    };

    try {

      const response = await fetch('http://127.0.0.1:5003/api/analytics/get_locations_based_on_analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')} `
          },
          body: JSON.stringify(postData),
        });

        if (response.status === 401) {
          window.location.href = "/login";
        }
      const data = await response.json();
      console.log(data)
      show_preferable_locations(data);

    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };


  const handleRefreshClick = () => {

    try {
      refreshLocationlist();

    } catch (error) {
      console.error("Error fetching refreshed locations:", error);
    }
  };

  //this label values will be fixed after getting an API request for "all_fields" from frontend
    const comboBoxValues = all_fields;


    return (
      <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" } }}> {/* xs: "none", sm: "block" means this will be hidden in mobile view */}
      <Box 
        position="fixed"
        width={300}
        py={4}
        pr={4}
        pl={2}
        bgcolor={mode === 'dark' ? "background.default" : "background.paper"}
        borderRadius={2}
        boxShadow={3}
      >

        {/* Slider */}
        <Typography gutterBottom>
          Preferable Living Cost (In US Dollar)
        </Typography>
        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={200}
          sx={{ color: mode === 'dark' ? "primary.main" : "secondary.main" }}
        />

        {/* Spacing */}
        <Box my={3}></Box>

        {/* Multiple Select */}
        <Typography gutterBottom>
          Select your Fields of Interest
        </Typography>
        <FormControl variant="outlined" style={{ width: 250 }}>
          <InputLabel>Fields</InputLabel>
          <Select
            multiple
            value={selectedOptions}
            onChange={handleChange}
            label="Options"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {comboBoxValues.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Button with gradient */}
        <Box mt={3}>
          <Button
            variant="outlined"
            onClick={handleShowPreferableLocationsClick}
            sx={{
              backgroundImage: 'linear-gradient(to right, blue, indigo)',
              '&:hover': {
                backgroundImage: 'linear-gradient(to right, #b3e0ff, #99d4ff)',
              }
            }}
          >
            SHOW PREFERED LOCATIONS
          </Button>
        </Box>

        <Box mt={3}>
          <Button
            variant="outlined"
            onClick={handleRefreshClick}
            sx={{
              backgroundImage: 'linear-gradient(to right, blue, indigo)',
              '&:hover': {
                backgroundImage: 'linear-gradient(to right, #b3e0ff, #99d4ff)',              }
            }}
          >
            REFRESH THIS PAGE
          </Button>
        </Box>

      </Box>
    </Box>
    )
  };
  
  export default Rightbar;