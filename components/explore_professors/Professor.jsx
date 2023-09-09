'use client'
import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import StyledButton from "../styled-components/StyledButton"
//import { useRouter } from 'next/navigation'


const Professor = ({ professor, refreshProfessorlist, mode }) => {


  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length-1]
  // //convert user id to int
  // user_id = parseInt(user_id);
  // console.log("user_id", user_id);

  const [user_id, setUserId] = useState(null);

  useEffect(() => {

    const user_id = localStorage.getItem('id');
    setUserId(user_id);

    if (!user_id) {
      navigation.push('/login');
    }

  }, []);

  const handleAddToShortlist = async () => {

    const postData = {
      student_id: user_id,
      professor_id: professor.id,
    };

    try {
      const response = await fetch('http://127.0.0.1:5001/api/profile/add_to_shortlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')} `
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 401) {
        navigation.push('/login');
      }

      if (response.ok) {
        alert('added to shortlist successfully');
        refreshProfessorlist();
      }
    } catch (error) {
      console.error("Error adding to shortlist:", error);
    }
  };

  const handleDetails = async () => {
    navigation.push(`/professor/${professor.id}/details`);
  };


  const handleRemoveFromShortlist = async () => {

    const postData = {
      student_id: user_id,
      professor_id: professor.id,
    };

    try {
      const response = await fetch('http://127.0.0.1:5001/api/profile/remove_from_shortlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')} `
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 401) {
        navigation.push('/login');
      }
      if (response.ok) {
        alert('removed from shortlist successfully');
        refreshProfessorlist();
      }
    } catch (error) {
      console.error("Error removing from shortlist:", error);
    }
  };


  return (
    <Card sx={{ margin: 5, borderColor: mode === 'dark' ? 'white' : 'black', borderWidth: '2px', borderStyle: 'solid', borderRadius: 4, boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)' }} >
      <CardHeader
        avatar={
          <Avatar alt="Profile Picture" src={professor.image_link} sx={{ width: 60, height: 60 }} />
        }

        title={
          /*Shows the professor's name */
          <Typography variant="h6" component="div">
            {professor.name}
          </Typography>
        }

        //subheader={professor.university_name}
        subheader={
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
        <Typography variant="body2" color={mode === 'dark' ? 'white' : 'black'}>
          <b>Website link :</b> {professor.website_link}
        </Typography>

        <Typography variant="body2" color={mode === 'dark' ? 'white' : 'black'}>
          <b>Email :</b> {professor.email}
        </Typography>

        <Typography variant="body2" color={mode === 'dark' ? 'white' : 'black'}>
          <b>Location :</b> {professor.location}
        </Typography>


        <br />

        <Typography variant="h8" color={mode === 'dark' ? 'white' : 'black'}>
          <b>Research Area:</b>

          {professor.field_names.map((field, index) => (
            <li key={index}>
              <Typography component="span" variant="body1" color={mode === 'dark' ? 'white' : 'black'}>
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

        {professor.shortlist_status === false ? (
          <StyledButton
            label="ADD TO SHORTLIST"
            backgroundColor="ButtonShadow"
            hoverBackgroundColor="ButtonHoverBackground"
            onClick={handleAddToShortlist}
          />
        ) : (
          <StyledButton
            label="REMOVE FROM SHORTLIST"
            backgroundColor="ButtonShadow"
            hoverBackgroundColor="ButtonHoverBackground"
            onClick={handleRemoveFromShortlist}
          />

        )
        }
      </CardActions>



    </Card>
  );
};

export default Professor;
