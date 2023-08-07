'use client'
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, Typography, TextField } from '@mui/material';

const ShowComment = ({ post, comments, onClose, open }) => {
  const [newComment, setNewComment] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleAddComment = () => {
    // Implement logic to add comment here
    console.log("Adding new comment:", newComment);
    // Clear the input field after adding the comment
    setNewComment('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Post and Comments</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.user_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.post_desc}
            </Typography>
            <hr />
            <Typography variant="h6">Comments:</Typography>
            {comments.map((comment) => (
              <Box key={comment.id} mt={2}>
                <Typography variant="body1">{comment.comment}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Commenter: {comment.commenter_user_name}
                </Typography>
                <hr />
              </Box>
            ))}
            {/* Input field for adding a new comment */}
            <TextField
              variant="outlined"
              label="Add a comment"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {/* Button to submit the new comment */}
            <Button onClick={handleAddComment} color="primary">
              Add Comment
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowComment;
