'use client'
import React, { useState, useEffect } from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
import ShowComment from "./ShowComment"
import EditPost from "./EditPost"
import DeletePost from "./DeletePost"
import Votes from "./Votes"
import StyledButton from "../styled-components/StyledButton"

const Post = ({ post, refreshPosts, mode }) => {


  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length-1]
  // //convert user id to int
  // user_id = parseInt(user_id);
  // console.log("user_id", user_id);

  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      window.location.href = "/login";
      return;
    }
    setUser_id(user_id);
  }, []);


  /*Constant variables can be declared once and cannot alter the values directly.
  To change the value of a const variable, we need a set method.
  Therefore all the const variables are created with a set method.
  For example, comments and setComments.
  useState initially assigns value to the const variable.*/

  const [comments, setComments] = useState([]);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [showDeletePostDialog, setShowDeletePostDialog] = useState(false);

  /*When Show Comments button is clicked, this function gets triggered.
  It fetches the comments under a post from the newsfeed service and pass the comments to ShowComment component.
  It also calls the handleOpenCommentDialog() function which is used to open a dialogue box to display the comments.
  In every async method, await is used.
  This means that, the next instruction will not be executed until the await function returns its result
  */

  const handleShowComments = async () => {
    try {
      // Fetch comments from the API
      const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/${user_id}/${post.post_id}/get_comments`
        , { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
      const data = await response.json();
      if (response.status === 401) {
        // redirect to the login page
        window.location.href = "/login";
        return;
      }
      setComments(data);

      // Open the comment dialog
      handleOpenCommentDialog();
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  /*When some update is done on comments, like adding a comment, edit, delete, refreshComments() is called from the
  respective components so that the live update of comments is shown in frontend. If this function was not called,
  then we needed to manually do a refresh from the browser.
  */

  const refreshComments = async () => {
    try {
      // Fetch comments from the API
      const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/${user_id}/${post.post_id}/get_comments`, 
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
      const data = await response.json();
      if (response.status === 401) {
        // redirect to the login page
        window.location.href = "/login";
        return;
      }

      setComments(data);

      // Reopen the comment dialog so the change can be seen.
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
    /*This is setting a boolean variable to be true. 
    In the ShowComment component, this boolean variable is checked 
    and if it is true, then the comment box is shown.
    */
    setShowCommentDialog(true);
  };

  const handleEditPost = () => {
    /*This function is triggered when Edit Post button is clicked.
    It basically calls the handleEditPostDialogOpen() function which sets a boolean value to true.
    In the EditPost component, this boolean value is checked and a box is opened to edit the post.
    */
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
    /*This function is triggered when Delete button is clicked.
    It basically calls the handleDeletePostDialogOpen() function which sets a boolean value to true.
    In the DeletePost component, this boolean value is checked and a box is opened to delete the post.
    */
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


  return (
    <Card sx={{ margin: 5}}>
      <CardHeader
        avatar={
          /*This part basically creates a red circle, and shows username in that red circle.
          When we add the profile picture feature in user service, we can show user's picture here
          instead of showing the username. This is currently used for design purpose.
          */
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {post.user_name}
          </Avatar>
        }

        title={
          /*Shows the Username in the post*/
          <Typography variant="h6" component="div">
            {post.user_name}
          </Typography>
        }
        //Shows the date when the post was created
        subheader={post.date}
      />
      
      <CardContent>
      {post.post_desc.split('\n').map((part, index) => (
        <Typography key={index} variant="body2" color="text.secondary">
          {part ? <b>{part}</b> : <br />}       
        </Typography>
      ))}
      </CardContent>
      {post.post_image && (
        <  CardMedia
        component="img"
        height="20%"
        image={post.post_image}
        alt="Paella dish"
      />
      ) }      

      <CardActions sx={{ margin: '10px 0' }}>
        {/*This component is used for upvotes and downvotes */}
        <Votes mode={mode} upvoteCount={post.upvotes} downvoteCount={post.downvotes} post_id={post.post_id} upvote_status={post.upvote_status} downvote_status={post.downvote_status}/>
        <StyledButton
          label="Show Comments"
          onClick={handleShowComments}
          backgroundColor="ButtonShadow"
          hoverBackgroundColor="ButtonHoverBackground"
        />
        <ShowComment post={post} comments={comments} onClose={handleCloseCommentDialog} open={showCommentDialog} refreshComments={refreshComments} />

        {/*We need to show Edit Post button to those posts, which the currently logged in user has created.
        Therefore if this condition is true, only then Edit Post button is shown. 
        */}
        {post.user_id == user_id && (
        <StyledButton
          label="Edit Post"
          onClick={handleEditPost}
          backgroundColor="#66FF66"
          hoverBackgroundColor="ButtonHoverBackground"
          disabled={user_id != post.user_id}
        >
          <b>Edit Post</b>
        </StyledButton> )}
        {/*EditPost Component is used to handle the tasks of showing box for editing post and 
        sending the update request to newsfeed server and finally show the edited post by calling refreshPosts() 
        The necessary parameters are passed here as usual.
        */}
        <EditPost post_id={post.post_id} initialPostDesc={post.post_desc} onOpen={showEditPostDialog} onClose={handleEditPostDialogClose} refreshPosts={refreshPosts}/>
        
        {/*Same logic as Edit Post*/}
        {post.user_id == user_id && (
        <StyledButton
          label="Delete"
          onClick={handleDeletePost}
          backgroundColor="#FF6666"
          hoverBackgroundColor="ButtonHoverBackground"
          disabled={user_id != post.user_id}
        />
        )}
        <DeletePost user_id={user_id} post_id={post.post_id} onOpen={showDeletePostDialog} onClose={handleDeletePostDialogClose} refreshPosts={refreshPosts}/>
      </CardActions>

    </Card>
  );
};

export default Post;
