'use client';
import React from 'react';
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const handleEditProfileClick = () => {
  // Handle edit profile click
};

const ProfileHeader = (userData) => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f4f7' }}>
      {/* Cover Photo */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundImage: `url('https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW4lMjBzbm93fGVufDB8fDB8fHww&w=1000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Edit Icon */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
      </Box>

      {/* Avatar, User Info, and Edit Profile Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 1, marginTop: '-50px' }}>
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3udlwo_p6SA6CUz3IhnFaH73FoismGVxeVurGt-oh&s"
          sx={{ 
            width: 100, 
            height: 100, 
            border: '3px solid #fff', 
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', 
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.3s'
            }
          }}
        />
        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#003366' }}>{userData.userData.username}</Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleEditProfileClick}
          sx={{
            color: '#003366',
            borderColor: '#003366',
            '&:hover': {
              backgroundColor: '#003366',
              color: 'white',
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
