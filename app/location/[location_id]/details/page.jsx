'use client'
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useState, useEffect } from "react";


export default function LocationDetails() {

  const [location, setLocation] = useState({}); /*The initial value of locations is an empty array*/
  const [user_id, setuser_id] = useState(null); /*The initial value of user_id is null*/

  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let location_id = tokens[tokens.length-2]
  location_id = parseInt(location_id);
  console.log("location_id", location_id);

  useEffect(() => {

    const user_id = localStorage.getItem("id");
    setuser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
    }

    async function fetchLocationDetails() {
      try {

        const response = await fetch(`http://127.0.0.1:5003/api/analytics/${location_id}/get_location_info`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
          }
        );

        if (response.status === 401) {
          window.location.href = "/login";
        }
        
        const data = await response.json();
        setLocation(data); 

      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    }
    fetchLocationDetails();
  }, []);



  return (
    <Box sx={{
        mt: 5,
        minHeight: '100vh',
        backgroundImage: `url(${location.image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '40px',
        paddingBottom: '40px',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
    }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: '600', color: '#2c3e50' }}>
        {location.location_name}, {location.state_name}, {location.country_name}
      </Typography>

      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '14px',
        padding: '20px',
      }}>
        <Grid container spacing={4} sx={{ mt: 4 }} justify="center"> {/* Adjusted here for centering */}
          <InfoCard title="Economy" content={location.economic_details} />
          <InfoCard title="Cost of Living" content={location.cost_of_living_details} />
          <InfoCard title="Transportation" content={location.transportation_details} />
          <InfoCard title="Weather" content={location.weather_details} />
          <InfoCard title="Population" content={location.population_details} />
          <InfoCard title="School" content={location.school_details} />
        </Grid>
      </Box>
    </Box>
  );
}

function InfoCard({ title, content }) {
  return (
    <Grid item xs={12} md={8} lg={6}> {/* Adjusted here for responsiveness */}
      <Paper sx={{ 
          p: 4, 
          maxWidth: '700px',  // Control the width here
          margin: '0 auto',  // This will center the card
          background: 'linear-gradient(135deg, rgba(255,250,250,0.9) 0%, rgba(247, 249, 252, 0.8) 100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', 
          borderRadius: '14px', 
          transition: 'transform .2s, boxShadow .3s',
          '&:hover': {
            transform: 'scale(1.05)', 
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)', 
          }
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#34495e', lineHeight: 1.6 }}>
          {content}
        </Typography>
      </Paper>
    </Grid>
  );
}

