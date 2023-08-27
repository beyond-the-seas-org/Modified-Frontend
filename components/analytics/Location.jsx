'use client'
import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import StyledButton from "../styled-components/StyledButton"
//import { useRouter } from 'next/navigation'


const Location = ({ location, refreshLocationlist, mode }) => {


  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  

  return (
    <Card  sx={{ 
      margin: 5, 
      borderColor: mode === 'dark' ? 'white' : 'black',
      borderWidth: '2px', 
      borderStyle: 'solid',
      borderRadius: 4,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('//img.bestplaces.net/images/states/new_york.jpg')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      color: mode === 'dark' ? 'white' : 'black'
    }}
  >
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
  
      
      <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
        <Typography variant="body2" color='white'>
          <b>Area type :</b> {location.area_type}
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Average living cost :</b> {location.avg_living_cost} $
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Summer comfort index :</b> {location.summer_comfort_index}/10
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Winter comfort index :</b> {location.winter_comfort_index}/10
        </Typography>

        <Typography variant="body2" color='white'>
          {/*tofixed() is used to express the float value upto 2 decimal point*/}
          <b>Overall weather comfort index :</b> {location.weather_comfort_index.toFixed(2)}/10 
        </Typography>

        <Typography variant="body2" color='white'>
          <b>Public transportation :</b> {location.public_transportation}
        </Typography>

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
          //href= {`http://localhost:3000/professor/${professor.id}/details`}
        />
      </CardActions>

    </Card>
  );
};

export default Location;
