'use client'
import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import ShowComment from "../components/ShowComment"
import EditPost from "../components/EditPost"
import Upvote from "../components/Upvotes"

const Post = ({ post }) => {


  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  const [comments, setComments] = useState([]);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  const handleShowComments = async () => {
    try {
      // Fetch comments from the API
      const response = await fetch(`http://localhost:5000/api/newsfeed/${post.post_id}/get_comments`);
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
    handleEditPostDialogOpen();
  };

  const handleEditPostDialogOpen = () => {
    // Open the edit post dialog
    setShowEditPostDialog(true);
  };

  const handleEditPostDialogClose = () => {
    // Close the edit post dialog
    setShowEditPostDialog(false);
  };


  const handleDeletePost = () => {
    // Implement logic to delete post here
    console.log("Delete Post clicked for post:", post);
  };


  const handleAddDownvote = () => {
    // Implement logic to add comment here
    alert("You have downvoted this post");
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
        title={
          <Typography variant="h6" component="div">
            {post.user_name}
          </Typography>
        }
        subheader={post.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.post_desc}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Upvote upvoteCount={post.upvote} post_id={post.post_id}/>
        <IconButton aria-label="Down vote" onClick={handleAddDownvote}>
          <ThumbDown />
          {post.downvotes}
        </IconButton>
        <IconButton aria-label="show comments" onClick={handleShowComments}>
          <ChatBubbleOutline />
        </IconButton>
        {/* Show the comments using the ShowComment component */}
        <ShowComment post={post} comments={comments} onClose={handleCloseCommentDialog} open={showCommentDialog} />
        <IconButton
          aria-label="edit post"
          onClick={handleEditPost}
          disabled={user_id != post.user_id}
        >
          <Edit />
        </IconButton>
        <EditPost post_id={post.post_id} initialPostDesc={post.post_desc} onOpen={showEditPostDialog} onClose={handleEditPostDialogClose}/>

        <IconButton
          aria-label="delete post"
          onClick={handleDeletePost}
          disabled={user_id != post.user_id}
        >
          <Delete />
        </IconButton>

      </CardActions>
    </Card>
  );
};

export default Post;
