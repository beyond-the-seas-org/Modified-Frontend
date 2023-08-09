import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const EditPost = ({ post_id, initialPostDesc, onOpen, onClose}) => {
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
          onClose(); // Close the dialog
          //notify
          alert("Post edited successfully");
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
        <TextField
          label="Edit your post"
          multiline
          rows={4}
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleEditPost}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPost;
