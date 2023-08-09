'use client'
import React, { useState } from 'react';
import { Box, Button, TextareaAutosize, IconButton } from '@mui/material';
import LoupeTwoToneIcon from '@mui/icons-material/LoupeTwoTone';
const AddPost = ({ onAddPost, refreshPosts }) => {
  const [postText, setPostText] = useState('');
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  const id = tokens[tokens.length-1]

  const handleAddPost = async () => {
    if (postText.trim() !== '') {
      const postData = {
        post_desc: postText,
        user_id: id,
        type: 'newsfeed',
      };
    
  
      try {
        const response = await fetch('http://localhost:5000/api/newsfeed/add_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        setPostText('');
        if (response.ok) {
          // Post added successfully
          onAddPost(postText);
          refreshPosts();

        } else {
          // Handle error
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }else {
      alert('Please enter some text');
    }
  };
  

  return (
    <Box mt={2} p={2} bgcolor="#f0f2f5" borderRadius="8px">
      <TextareaAutosize
        placeholder="What's on your mind"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{ width: '100%', minHeight: '100px', resize: 'none', color: 'black' }}
      />
      <Box display="flex" justifyContent="flex-end">
      <Button
          variant="outlined"
          onClick={handleAddPost}
          sx={{
            color: 'black', // Set text color to black
            '&:hover': {
              backgroundColor: '#000000', // Change background color on hover
              color: 'white', // Change text color on hover
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
