'use client'
import React from 'react';
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const handleEditProfileClick = () => {
  // Handle edit profile click
};

const ProfileHeader = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Cover Photo
      <Box
        sx={{
          width: '100%',
          height: '400px', // Set the desired height for the cover photo
          backgroundImage: `url('https://2.bp.blogspot.com/-nfvjMm5r4HE/UAEzYD80HII/AAAAAAAAARA/CASgQfzOD3w/s1600/free-facebook-cover-photo-make-your-own.jpg')`,
          backgroundSize: 'cover', // Set the background size to 'contain'
          backgroundPosition: 'center',
        }}
      >
        {/* Edit Icon */}
        {/* <Box sx={{ position: 'absolute', top: 0, right: 0, padding: 1 }}>
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
      </Box> */} 

      {/* Avatar, User Info, and Edit Profile Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 1 }}>
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3udlwo_p6SA6CUz3IhnFaH73FoismGVxeVurGt-oh&s"
          sx={{ width: 100, height: 100, border: '2px solid #fff', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4">Azizur Rahman Anik</Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleEditProfileClick}
          sx={{
            color: 'black', // Set text color to black
            '&:hover': {
              backgroundColor: '#000000', // Change background color on hover
              color: 'white', // Change text color on hover
            },
          }}
        >
          <b>Edit Profile</b>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
