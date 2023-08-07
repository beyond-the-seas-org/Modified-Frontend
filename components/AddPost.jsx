'use client'
import React, { useState } from 'react';
import { Box, Button, TextareaAutosize, IconButton } from '@mui/material';
import LoupeTwoToneIcon from '@mui/icons-material/LoupeTwoTone';
const AddPost = ({ onAddPost }) => {
  const [postText, setPostText] = useState('');

  const handleAddPost = () => {
    // Call the onAddPost function to add the post
    if (postText.trim() !== '') {
      onAddPost(postText);
      setPostText('');
    }
  };

  return (
    <Box mt={2} p={2} bgcolor="#f0f2f5" borderRadius="8px">
      <TextareaAutosize
        placeholder="What's on your mind"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{ width: '100%', minHeight: '100px', resize: 'none' }}
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
