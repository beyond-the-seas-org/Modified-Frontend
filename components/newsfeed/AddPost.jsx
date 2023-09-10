'use client'
import React, { useState, useEffect, use } from 'react';
import { Box, Button, TextareaAutosize } from '@mui/material';
import axios from 'axios';

const AddPost = ({ refreshPosts }) => {
  const [postText, setPostText] = useState('');

  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // const id = tokens[tokens.length-1]

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    setUser_id(user_id);
  }, []);


  // const handleFileChange = (event) => {
  //   setImage(event.target.files[0]);
  // };

  const handleImageUpload = async (postid) => {
    const formData = new FormData();
    formData.append('image_file', image);

    try {
      const response = await axios.post(`http://localhost:5000/api/newsfeed/${postid}/add_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // check for 401 status code
      if (response.status === 401) {
        // redirect to the login page
        window.location.href = "/login";
        return;
      }

      setImageURL(response.data.url);
      console.log('Image URL:', response.data.url);

      if (response.data.status === "ok") {
        alert('Post added successfully');
        //console.log("imageURL: ",imageURL);
        refreshPosts();
        setImage(null);
        document.getElementById('fileInput').value = null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  /*When the Add Post button is clicked, this function is called and does necessary tasks to send the post to 
  the server and refreshing the posts to show the update */
  const handleAddPost = async () => {
    // handleImageUpload();

    if (postText.trim() !== '') {
      /* If the post is not a empty string, then the following data is sent to the newsfeed service with a POST rewuest. */
      const postData = {
        post_desc: postText,
        user_id: user_id,
        type: 'newsfeed',
      };


      try {
        let postid;
        const response = await fetch('http://localhost:5000/api/newsfeed/add_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(postData),
        });

        // check for 401 status code
        if (response.status === 401) {
          // redirect to the login page
          window.location.href = "/login";
          return;
        }

        setPostText('');
        //remove the image from the input field
        if (response.ok) {
          // Post added successfully
          const data = await response.json();
          if (image != null) {
            handleImageUpload(data.post_id);

          }
          else {
            alert('Post added successfully');
            //console.log("imageURL: ",imageURL);
            //console.log(response.ok)

            refreshPosts();
          }
        } else {
          // Handle error
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      /*If the post is empty string and the user clicks the Add Post button, then this alert is shown in the browser */
      alert('Please enter some text');
    }
  };


  return (
    <Box mt={3} p={3} boxShadow={3} bgcolor="white" borderRadius="8px">

      <TextareaAutosize
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '100px',
          resize: 'none',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif'
        }}
      />

      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <Box display="flex" alignItems="center" p={1} bgcolor="#E0F2FE" border="1px solid #87CEFA" borderRadius="8px">
            <b style={{ marginRight: '8px', color: '#4682B4' }}>Upload Image</b>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </Box>
          {/* show the picked filename */}
          {image && <span style={{ marginLeft: '8px', color: '#4682B4' }}>{image.name}</span>}
        </label>


        <Button
          variant="contained"
          onClick={handleAddPost}
          style={{ backgroundColor: '#87CEFA', color: 'black' }}
          sx={{
            '&:hover': {
              backgroundColor: '#76BDE1', // Change background color on hover to a slightly darker shade
              boxShadow: 'none'
            },
          }}
        >
          <b>Add Post</b>
        </Button>
      </Box>
    </Box>
  );

};

export default AddPost;
