'use client'
import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import StyledButton from "../styled-components/StyledButton"
import { useRouter } from 'next/navigation'


const Professor = ({ professor, refreshProfessorlist, mode }) => {

  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    setUser_id(user_id);

    if(!user_id){
      window.location.href = '/login';

    }

  }, []);

  const router = useRouter()

  const handleDetails = async () => {
    router.push(`professor/${professor.id}/details`)
  }


  return (
    <Card sx={{ margin: 5 , borderColor:mode === 'dark' ? 'white' : 'black' ,borderWidth: '2px', borderStyle: 'solid',borderRadius: 4,boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'}} >
      <CardHeader
        avatar={ 
          <Avatar alt="Profile Picture" src={professor.image_link} sx={{ width: 60, height: 60 }}/>
        }

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
        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Website link :</b> {professor.website_link}
        </Typography>

        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Email :</b> {professor.email}
        </Typography>

        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Location :</b> {professor.location}
        </Typography>

        
        <br/>

        <Typography variant="h8" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Research Area:</b>
        
          {professor.field_names.map((field, index) => (
            <li key={index}>
              <Typography component="span" variant="body1" color={ mode === 'dark' ? 'white' : 'black' }>
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
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
          onClick={handleDetails}
        />
      </CardActions>

    </Card>
  );
};

export default Professor;
