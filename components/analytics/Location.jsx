'use client'
import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import StyledButton from "../styled-components/StyledButton"
import { useRouter } from 'next/navigation'
import {Link} from 'next/link';


const Location = ({ location, refreshLocationlist, mode }) => {

  const [user_id, setuser_id] = useState(null); /*The initial value of user_id is null*/
  const navigation = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    setuser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
    }

  }, []);

  const handleProfessorClick = async () => {
    navigation.push(`/analytics/explore_professors/${location.id}`);
  }
  

  return (
    //This card is used to show location details. The card is styled using sx property.
    <Card  sx={{ 
      margin: 5, 
      borderColor: mode === 'dark' ? 'white' : 'black',
      borderWidth: '2px', 
      borderStyle: 'solid',
      borderRadius: 4,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${location.image})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      color: mode === 'dark' ? 'white' : 'black',
      transition: 'transform .2s',  // add this line for smooth transform transitions
        '&:hover': {  // styles applied when card is hovered
          transform: 'scale(1.05)'  // scale the card up a little
        },
      //href = {`http://localhost:3000/location/${location.id}/details`}
    }}
  >
    {/* CardHeader is used to show the location name, state name and country name. The card header is styled using sx property. */}
    <CardHeader sx={{
      textAlign: 'center'
      }}
      title={
        <Typography variant="h6" color="white" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
          {location.location_name}, {location.state_name}
        </Typography>
      }
      subheader={
        <div>
          <Typography variant="body2" color="white" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
            {location.country_name}
          </Typography>
        </div>
      }
    />

      {/* CardContent is used to show the location details. The card content is styled using sx property. */}
      <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
        {/* <Typography variant="body2" color='white'>
          <b>Area type :</b> {location.area_type}
        </Typography> */}

        <Typography variant="body2" color='white'>
          <b>Living cost :</b> {location.avg_living_cost} (US Standard = 100)
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Median income :</b> {location.avg_income}
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Avg Home Price :</b> {location.home_price} 
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Summer comfort index :</b> {location.summer_comfort_index}/10
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Winter comfort index :</b> {location.winter_comfort_index}/10
        </Typography>


        {/* <Typography variant="body2" color='white'>
          <b>Public transportation :</b> {location.public_transportation}
        </Typography> */}

        <Typography variant="body2" color='white'>
          <b>Average income :</b> {location.avg_income} $
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Population :</b> {location.population}
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Unemployment rate :</b> {location.unemployment_rate}%
        </Typography>

        
      </CardContent>

      {/* <CardMedia
        component="img"
        height="20%"
        image={post.post_image || "https://illinois.edu/assets/img/about/landmarks/aces-library.jpg"}
        alt="Paella dish"
      /> */}

      <CardActions sx={{ margin: '10px 0' }}>
        <StyledButton
          label="SHOW PROFESSORS"
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
          onClick= {handleProfessorClick}
        />

        <StyledButton
          label="SHOW LOCATION DETAILS"
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
          href= {`http://127.0.0.1:3000/location/${location.id}/details`}
        />
      </CardActions>

    </Card>
  );
};

export default Location;
