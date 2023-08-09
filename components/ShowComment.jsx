'use client'
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, Typography, TextField } from '@mui/material';
import AddComment from './AddComment';
const ShowComment = ({ post, comments, onClose, open }) => {
  const [newComment, setNewComment] = useState('');

  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  const handleClose = () => {
    onClose();
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
                <Typography variant="body2" color="textSecondary">
                  Commenter: <b>{comment.commentor}</b>
                </Typography>
                <Typography variant="body1">{comment.comment}</Typography>
                <hr />
              </Box>
            ))}
            {/* Button to submit the new comment */}
            <AddComment user_id={user_id} post_id={post.post_id}/>
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
