import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Notification, { showNotification } from './notification/Notification'; // Import showNotification
import { on } from 'events';

const EditComment = ({ comment_id, initialcommentDesc, onOpen, onClose, refreshcomments}) => {
  const [commentDesc, setcommentDesc] = useState(initialcommentDesc);

  console.log(commentDesc)

  const handleEditcomment = async () => {
    if (commentDesc.trim() !== '') {
      const commentData = {
        comment_id: comment_id,
        comment: commentDesc,
      };

      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/edit_comment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        });

        if (response.ok) {
          
          setcommentDesc('');
          onClose();
          alert('comment edited successfully');
          
        } else {
          console.error('Failed to edit comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogTitle>Edit comment</DialogTitle>
      <DialogContent>
        <TextField
          label="Edit your comment"
          multiline
          rows={4}
          value={commentDesc}
          onChange={(e) => setcommentDesc(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleEditcomment}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComment;
