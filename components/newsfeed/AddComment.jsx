'use'
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const AddComment = ({ post_id, user_id, refreshComments}) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (commentText.trim() !== '') {
      const commentData = {
        post_id: post_id,
        user_id: user_id,
        comment: commentText,
      };

      try {
        const response = await fetch('http://localhost:5000/api/newsfeed/add_comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(commentData),
        });

        // check for 401 status code
        if (response.status === 401) {
          // redirect to the login page
          window.location.href = '/login';
          return;
        }

        if (response.ok) {
          // Comment added successfully
          setCommentText('');
          refreshComments();
          alert('Comment added successfully');
        } else {
          // Handle error
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
        {/* Input field for adding a new comment */}
        <TextField
            variant="outlined"
            label="Add a comment"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
        />
      <Button variant="contained" onClick={handleAddComment}>
        Add Comment
      </Button>
    </div>
  );
};

export default AddComment;
