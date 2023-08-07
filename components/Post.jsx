'use client'
import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import ShowComment from "../components/ShowComment"

const Post = ({ post }) => {

  const [comments, setComments] = useState([]);
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const handleShowComments = async () => {
    try {
      // Fetch comments from the API
      const response = await fetch(`https://json-server-for-project.vercel.app/comments?id=${post.id}`);
      const data = await response.json();
      setComments(data);

      // Open the comment dialog
      handleOpenCommentDialog();
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCloseCommentDialog = () => {
    // Close the comment dialog
    setShowCommentDialog(false);
  };

  const handleOpenCommentDialog = () => {
    // Open the comment dialog
    setShowCommentDialog(true);
  };

  const handleEditPost = () => {
    // Implement logic to edit post here
    console.log("Edit Post clicked for post:", post);
  };

  const handleDeletePost = () => {
    // Implement logic to delete post here
    console.log("Delete Post clicked for post:", post);
  };

  const handleAddComment = () => {
    // Implement logic to add comment here
    console.log("Add Comment clicked for post:", post);
  };

  const handleAddUpvote = () => {
    // Implement logic to add comment here
    console.log("Add Upvote clicked for post:", post);
  };

  const handleAddDownvote = () => {
    // Implement logic to add comment here
    console.log("Add Downvote clicked for post:", post);
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post.user_name}
        subheader={post.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.post_desc}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="Up vote" onClick={handleAddUpvote}>
          <ThumbUp />
          {post.upvotes}
        </IconButton>
        <IconButton aria-label="Down vote" onClick={handleAddDownvote}>
          <ThumbDown />
          {post.downvotes}
        </IconButton>
        <IconButton aria-label="show comments" onClick={handleShowComments}>
          <ChatBubbleOutline />
        </IconButton>
        {/* Show the comments using the ShowComment component */}
        <ShowComment post={post} comments={comments} onClose={handleCloseCommentDialog} open={showCommentDialog} />
        <IconButton aria-label="edit post" onClick={handleEditPost}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete post" onClick={handleDeletePost}>
          <Delete />
        </IconButton>
        <Button variant="outlined" color="primary" onClick={handleAddComment} >
          Add Comment
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
