'use client'
import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import StyledButton from "../styled-components/StyledButton"

const Professor = ({ professor, refreshProfessorlist, mode }) => {


  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);


  const handleShowDetails = () => {
    //redirect to "Professor details UI"

  };

  

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        // avatar={
        //   /*This part basically creates a red circle, and shows username in that red circle.
        //   When we add the profile picture feature in user service, we can show user's picture here
        //   instead of showing the username. This is currently used for design purpose.
        //   */
        //   <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
        //     {post.user_name}
        //   </Avatar>
        // }

        title={
          /*Shows the professor's name */
          <Typography variant="h6" component="div">
            {professor.name}
          </Typography>
        }

        //subheader={professor.university_name}
        subheader ={
          <div>
            <Typography variant="body2" color="textSecondary">
            {professor.university_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            University rank: {professor.university_rank}
            </Typography>
            {/* You can continue to add more subheaders in the same fashion */}
          </div>
        }

  
      />
      
      <CardContent>
        {/* <Typography variant="body2" color="black">
          <b>Website link :</b> {professor.website_link}
        </Typography> */}

        <Typography variant="body2" color="black">
          <b>Email :</b> {professor.email}
        </Typography>

        
        <br/>

        <Typography variant="h8" color="black">
          <b>Research Area:</b>
        
          {professor.field_names.map((field, index) => (
            <li key={index}>
              <Typography component="span" variant="body1">
                {field}
              </Typography>
            </li>
          ))}
          
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
          label="SHOW DETAILS"
          onClick={handleShowDetails}
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
        />
      </CardActions>

    </Card>
  );
};

export default Professor;
