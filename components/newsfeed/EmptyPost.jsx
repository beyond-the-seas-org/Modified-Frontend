'use client'
import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
//import StyledButton from "../styled-components/StyledButton"


const EmptyPost = ({ mode }) => {


  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length-1]
  // //convert user id to int
  // user_id = parseInt(user_id);
  // console.log("user_id", user_id);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      window.location.href = "/login";
      return;
    }
  }, []);

  return (
    <Card sx={{ 
      margin: 5 , 
      borderColor:mode === 'dark' ? 'white' : 'black' ,
      borderWidth: '2px', 
      borderStyle: 'solid',
      borderRadius: 4,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }
      } >
      <CardHeader
        // avatar={ 
        //   <Avatar alt="Profile Picture" src={professor.image_link} sx={{ width: 60, height: 60 }}/>
        // }

        title={
          /*Shows the professor's name */
          <Typography variant="h6" component="div">
            No Post Found
          </Typography>
        }

        
      />
      

    </Card>
  );
};

export default EmptyPost;
