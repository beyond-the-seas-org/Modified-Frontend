'use client'
import React, { useState , useEffect} from 'react';
import { Box, Button, TextareaAutosize} from '@mui/material';

const AddPost = ({ refreshPosts }) => {
  const [postText, setPostText] = useState('');
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  const id = tokens[tokens.length-1]

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  /*When the Add Post button is clicked, this function is called and does necessary tasks to send the post to 
  the server and refreshing the posts to show the update */
  const handleAddPost = async () => {
    // handleImageUpload();

    if (postText.trim() !== '') {
      /* If the post is not a empty string, then the following data is sent to the newsfeed service with a POST rewuest. */
      const postData = {
        post_desc: postText,
        user_id: id,
        type: 'newsfeed',
        image: selectedFile,
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
          alert('Post added successfully');
          refreshPosts();

        } else {
          // Handle error
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }else {
      /*If the post is empty string and the user clicks the Add Post button, then this alert is shown in the browser */
      alert('Please enter some text');
    }
  };
  

  return (
    <Box mt={2} p={2} bgcolor="#f0f2f5" borderRadius="8px">

      <TextareaAutosize
        placeholder="What's on your mind"
        value={postText}
        onChange={(e) => setPostText(e.target.value)} /*Whenever something is written to the Add Post box, that string is set here. onChange is a listener to this box*/
        style={{ width: '100%', minHeight: '100px', resize: 'none', color: 'black' }}
      />
      {/* This input type = "file" is a File Picker used to add the feature of adding an image to the post */}
      <Box display="flex" justifyContent="flex-start">
        <input type="file" onChange={handleFileChange} style={{ backgroundcolor: 'gray' }} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={handleAddPost}
          style={{ backgroundColor: '#33FF99', color: 'black', border: '2px solid black' }}
          sx={{
            '&:hover': {
              backgroundColor: '#33FF99', // Change background color on hover
              color: 'black', // Change text color on hover
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