'use client';
import React from 'react';
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProfileHeader = (userData) => {
  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length - 1];

  const [user_id, setUser_id] = useState(null);
  navigation = useRouter();

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    setUser_id(user_id);

    if (!user_id) {
      window.location.href = '/login';
      return;
    }
  }, []);

  const handleUpdate = async () => {
    const access_token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('id');
    const refresh_token = localStorage.getItem('refresh_token');

    if (!access_token || !user_id || !refresh_token) {
      window.location.href = '/login';
      return;
    }

    navigation.push('/profile/update');
  };
  
  const handleLogout = async () => {
    // Implement the logout functionality here

    // retrieve the access and refresh tokens from local storage
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const user_id = localStorage.getItem("id");

    // make a POST request to the logout endpoint
    const apiEndpoint = "http://127.0.0.1:5001/api/auth/logout";
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({ refresh_token: refresh_token }),
    });

    if (response.status === 401) {
      // redirect to the login page
      window.location.href = "/login";
      return;
    }

    // check if the response is ok
    if (response.ok) {
      // remove the access and refresh tokens from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("id");

      alert("Logout successful!");
      console.log(localStorage);
      // redirect to the login page
      window.location.href = "/login";
    } else {
      // if the response is not ok, display an error message
      alert("Error: Logout failed. Please try again.");
    }

    // print the local storage to the console
  };

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
        <Box sx={{ display: 'flex', gap: '2' }}>
          <Typography variant="h4" sx={{ color: '#003366' }}>{userData.userData.username}</Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleUpdate}
          color="primary"
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
        <Button
          variant="outlined"
          onClick={handleLogout}
          color="secondary"
          sx={{
            color: '#AA0000',  // Change colors as per your design requirements
            borderColor: '#AA0000',
            '&:hover': {
              backgroundColor: '#AA0000',
              color: 'white',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
