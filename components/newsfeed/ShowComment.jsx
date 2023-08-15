'use client'
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, Typography, IconButton } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import AddComment from './AddComment';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
const ShowComment = ({ post, comments, onClose, open, refreshComments }) => {
const [openEditCommentDialogs, setOpenEditCommentDialogs] = useState({});
// const [showDeleteCommentDialog, setShowDeleteCommentDialog] = useState(false);
const [openDeleteCommentDialogs, setOpenDeleteCommentDialogs] = useState({});

  
  /*
    This function is used to show the edit comment dialog for a specific comment. 
    It takes a commentId as a parameter, which represents the unique identifier of the comment that the user wants to edit. 
    Inside this function, the state openEditCommentDialogs is updated using the previous state (prevState)
    by setting the value corresponding to the commentId to true. 
    This will open the edit comment dialog for that specific comment.
  */
  const showEditCommentDialog = (commentId) => {
    setOpenEditCommentDialogs((prevState) => ({
      ...prevState,
      [commentId]: true,
    }));
  };



  /*
    This function is used to close the edit comment dialog for a specific comment. 
    It takes a commentId as a parameter, similar to the showEditCommentDialog function. 
    Inside this function, the state openEditCommentDialogs is updated by setting the value 
    corresponding to the commentId to false. This will close the edit comment dialog for that specific comment. 
    Additionally, this function calls refreshComments() to refresh the comments after the edit dialog is closed.
  */
  const handleEditCommentDialogClose = (commentId) => {
    setOpenEditCommentDialogs((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));

    // Refresh the comments
    refreshComments();
  };

  /*
    Similar logic to that of showEditCommentDialog
  */
  const showDeleteCommentDialog = (commentId) => {
    setOpenDeleteCommentDialogs((prevState) => ({
      ...prevState,
      [commentId]: true,
    }));
  };

  /*
    Similar logic to that of handleEditCommentDialogClose
  */
  const handleDeleteCommentDialogClose = (commentId) => {
    setOpenDeleteCommentDialogs((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
    refreshComments();
  };


  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);

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
            {comments.length === 0 ? (
              <Box mt={2}>
                <Typography variant="body1">No comments yet.</Typography>
              </Box>
            ) : (
            comments.map((comment) => (
            <Box key={comment.comment_id} mt={2}>
              <Typography variant="body2" color="textSecondary">
                Commenter: <b>{comment.commentor}</b>
              </Typography>
              <Typography variant="body1">{comment.comment}</Typography>
              {user_id == comment.user_id && (
                <Box mt={1}>
                  <IconButton
                    onClick={() => showEditCommentDialog(comment.comment_id)}
                    aria-label="edit comment"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => showDeleteCommentDialog(comment.comment_id)}
                    aria-label="delete comment"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
              <hr />
              {/* Create a separate EditComment instance for each comment */}
              {openEditCommentDialogs[comment.comment_id] && (
                <EditComment
                  comment_id={comment.comment_id}
                  initialcommentDesc={comment.comment}
                  onOpen={() => showEditCommentDialog(comment.comment_id)}
                  onClose={() => handleEditCommentDialogClose(comment.comment_id)}
                  refreshComments={refreshComments}
                />
              )}

              {/* Create a separate DeleteComment instance for each comment */}
              {openDeleteCommentDialogs[comment.comment_id] && (
                <DeleteComment
                  comment_id={comment.comment_id}
                  user_id={user_id}
                  onOpen={()=>showDeleteCommentDialog(comment.comment_id)}
                  onClose={()=>handleDeleteCommentDialogClose(comment.comment_id)}
                  refreshComments={refreshComments}
                  />
              )}

              {/* <DeleteComment comment_id={comment.comment_id} user_id={user_id} onOpen={showDeleteCommentDialog} onClose={handleDeleteCommentDialogClose} refreshComments={refreshComments} /> */}
            </Box>
            )))}

            {/* Button to submit the new comment */}
            <AddComment user_id={user_id} post_id={post.post_id} refreshComments={refreshComments}/>
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
