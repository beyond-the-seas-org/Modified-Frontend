import React, { useState } from 'react';
import { TextareaAutosize, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import Notification, { showNotification } from './notification/Notification'; // Import showNotification

const EditPost = ({ post_id, initialPostDesc, onOpen, onClose, refreshPosts}) => {
  const [postDesc, setPostDesc] = useState(initialPostDesc);

  const handleEditPost = async () => {
    if (postDesc.trim() !== '') {
      const postData = {
        post_id: post_id,
        post_desc: postDesc,
      };

      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/edit_post`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          // Post edited successfully
          console.log('Post edited successfully')
          setPostDesc('');
          refreshPosts();
          onClose(); // Close the dialog
          //notify
          showNotification('Post edited successfully', 'success');
          console.log('called showNotification')
        } else {
          // Handle error
          console.error('Failed to edit post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={onOpen} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'lightgray', // Custom background color
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '8px', // Add padding for better visual
        }}
      >
        <TextareaAutosize
          minRows={4} 
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
          placeholder="Edit your post..."
          style={{ width: '400 px', color: 'black', border: '2px solid black'}}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{backgroundColor:'#FF3333', color: 'black' , border: '2px solid black'}}> <b>Cancel</b></Button>
        <Button  onClick={handleEditPost} style={{backgroundColor: '#33FF33', color: 'black', border: '2px solid black'}}>
          <b>Save Changes</b> 
        </Button>
        <Notification />
      </DialogActions>
    </Dialog>
  );
};

export default EditPost;
