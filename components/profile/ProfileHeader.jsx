'use client';
import React from 'react';
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const ProfileHeader = (userData) => {
  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length - 1];

  const [user_id, setUser_id] = useState(null);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(userData.userData.profile_picture_link);

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

  const redirectToNewsfeed = () => {
    navigation.push('/newsfeed');
  };

  const handleImageUpload = async () => {
    const access_token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('id');
    const refresh_token = localStorage.getItem('refresh_token');
  
    if (!access_token || !user_id || !refresh_token) {
      window.location.href = '/login';
      return;
    }
  
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none'; // Hide the input
  
    // Add the file input to the document body
    document.body.appendChild(fileInput);
  
    // Trigger a click event on the hidden file input
    fileInput.click();
  
    // Add an event listener to the file input to handle the selected file
    fileInput.addEventListener('change', async (event) => {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        // Create a FormData object to send the file to the API
        const formData = new FormData();
        formData.append('image_file', selectedFile);
  
        try {
          const response = await axios.put(
            `http://localhost:5001/api/profile/add_profile_picture/${user_id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
  
          // Check for 401 status code
          if (response.status === 401) {
            // Redirect to the login page
            window.location.href = "/login";
            return;
          }
  
          setImageURL(response.data.url);
          console.log('Image URL:', response.data.url);
  
          if (response.data.status === "ok") {
            alert('Profile Picture updated successfully');
            setImage(null);
          }
  
          // Remove the file input from the document body
          document.body.removeChild(fileInput);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });
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
        {/* Edit Icon
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton>
            <Edit />
          </IconButton>
        </Box> */}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, marginTop: '-50px' }}>
    {/* Avatar */}
    <Avatar
      src={imageURL ? imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3udlwo_p6SA6CUz3IhnFaH73FoismGVxeVurGt-oh&s"}
      sx={{
        width: 100,
        height: 100,
        border: '3px solid #fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        marginBottom: '10px',
        '&:hover': {
          transform: 'scale(1.1)',
          transition: 'transform 0.3s'
        }
      }}
    />

    {/* Username */}
    <Typography variant="h4" sx={{ color: '#003366', marginBottom: '10px' }}>{userData.userData.username}</Typography>

    {/* Edit Profile and Upload Picture Buttons */}
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', marginBottom: '10px', alignItems: 'center' }}>
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
        onClick={handleImageUpload}
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
        Change Photo
      </Button>

      <Box sx={{ display: 'none' }}>
        <input
          id="fileInput"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ backgroundColor: 'gray' }}
        />
      </Box>
    </Box>

    {/* Go Back to Newsfeed Button */}
    <Button
        variant="outlined"
        onClick={redirectToNewsfeed}
        color="primary"
        sx={{
          color: '#003366',
          borderColor: '#003366',
          marginTop: '10px',  // Providing some spacing from the above components
          '&:hover': {
            backgroundColor: '#003366',
            color: 'white',
          },
        }}
      >
        Go to Homepage
      </Button>

      {/* Logout Button */}
      <Button
        variant="outlined"
        onClick={handleLogout}
        color="secondary"
        sx={{
          color: '#AA0000',
          borderColor: '#AA0000',
          marginTop: '10px',
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
