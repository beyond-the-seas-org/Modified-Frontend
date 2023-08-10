'use client'
import React, { useState} from 'react';
import { IconButton } from '@mui/material';
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

const Upvote = ({ upvoteCount, post_id, upvote_status, downvote_status, updateUpvoteStatus, getDownvoteStatus }) => {
  const [voteCount, setUpvoteCount] = useState(upvoteCount);
  const [upvoteStatus, setUpvoteStatus] = useState(upvote_status);
  const [downvoteStatus, setDownvoteStatus] = useState(downvote_status);
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);
  console.log("user_id", user_id);
  console.log("upvote_status===", upvote_status)
  console.log("downvote_status from Upvotes component", downvote_status)

  let op = '';

  const updateUpvote = async () => {
    
    const data = {
      upvote: voteCount,
      post_id: post_id,
      user_id: user_id
    };

    try {
      const response = await fetch(`http://localhost:5000/api/newsfeed/post/upvote/${op}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Upvote added successfully.
        if(op === 'increment'){
            setUpvoteStatus(true);
            updateUpvoteStatus(true);
            alert("Upvoted successfully");
        }else{
            setUpvoteStatus(false);
            updateUpvoteStatus(false);
            alert("Upvote removed successfully");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleUpvote = async () => {
    setDownvoteStatus(getDownvoteStatus());
    if (!upvoteStatus && !downvoteStatus) {
      setUpvoteStatus(true);
      console.log("upvote_status from handleUpvote", upvoteStatus)
      setUpvoteCount(voteCount + 1);
      op = 'increment';
      updateUpvoteStatus(true);
      console.log("upvote_status from handleUpvote", upvoteStatus)
      updateUpvote();
    } else if (upvoteStatus && !downvoteStatus) {
      setUpvoteStatus(false);
      console.log("upvote_status from handleUpvote", upvoteStatus)
      setUpvoteCount(voteCount - 1);
      op = 'decrement';
      updateUpvoteStatus(false);
      console.log("upvote_status from handleUpvote", upvoteStatus)
      updateUpvote();
    } else {
      alert("You have already downvoted this post. You cannot upvote it now.");
    }

  };

  return (
  <IconButton aria-label="upvote" onClick={handleUpvote} style={{ color: upvoteStatus ? 'blue' : 'inherit' }} disabled={getDownvoteStatus()==true}>
    {upvoteStatus ? <ThumbUp /> : <ThumbUpOutlined />}
    {voteCount}
  </IconButton>
  );
};

export default Upvote;
