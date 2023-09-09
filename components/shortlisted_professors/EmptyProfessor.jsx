'use client'
import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
//import StyledButton from "../styled-components/StyledButton"


const EmptyProfessor = ({ mode }) => {

  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    setUser_id(user_id);

    if(!user_id){
      window.location.href = '/login';
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
            No match Found
          </Typography>
        }

        
      />
      

    </Card>
  );
};

export default EmptyProfessor;
