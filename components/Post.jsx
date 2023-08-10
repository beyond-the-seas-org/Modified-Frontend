'use client'
import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import ShowComment from "../components/ShowComment"
import EditPost from "../components/EditPost"
import Upvote from "../components/Upvotes"
import Downvote from "../components/Downvotes"
import DeletePost from "../components/DeletePost"
import StyledButton from "../components/styled-components/StyledButton"

const Post = ({ post, refreshPosts }) => {


  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  const [comments, setComments] = useState([]);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [showDeletePostDialog, setShowDeletePostDialog] = useState(false);
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
    handleDeletePostDialogOpen();
  };

  const handleDeletePostDialogOpen = () => {
    // Open the edit post dialog
    setShowDeletePostDialog(true);
  };

  const handleDeletePostDialogClose = () => {
    // Close the edit post dialog
    setShowDeletePostDialog(false);
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

      <CardActions sx={{ margin: '10px 0' }}>
        <Upvote upvoteCount={post.upvote} post_id={post.post_id}/>
        <Downvote downvoteCount={post.downvotes} post_id={post.post_id}/>
        <StyledButton
          label="Show Comments"
          onClick={handleShowComments}
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
        />
        <ShowComment post={post} comments={comments} onClose={handleCloseCommentDialog} open={showCommentDialog} />


        <StyledButton
          label="Edit Post"
          onClick={handleEditPost}
          backgroundColor="#66FF66"
          hoverBackgroundColor="ButtonHoverBackground"
          disabled={user_id !== post.user_id}
        >
          <b>Edit Post</b>
        </StyledButton>
        <EditPost post_id={post.post_id} initialPostDesc={post.post_desc} onOpen={showEditPostDialog} onClose={handleEditPostDialogClose} refreshPosts={refreshPosts}/>
        
        
        <StyledButton
          label="Delete"
          onClick={handleDeletePost}
          backgroundColor="#FF6666"
          hoverBackgroundColor="ButtonHoverBackground"
          disabled={user_id !== post.user_id}
        />
        <DeletePost user_id={user_id} post_id={post.post_id} onOpen={showDeletePostDialog} onClose={handleDeletePostDialogClose} refreshPosts={refreshPosts}/>
      </CardActions>

    </Card>
  );
};

export default Post;
