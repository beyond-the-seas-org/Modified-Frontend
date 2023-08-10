'use client'
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Thumbdown, ThumbdownOutlined } from '@mui/icons-material';

const Downvote = ({ downvoteCount, post_id, downvote_status, upvote_status, updateDownvoteStatus, getUpvoteStatus }) => {
  const [voteCount, setdownvoteCount] = useState(downvoteCount);
  const [downvoteStatus, setdownvoteStatus] = useState(downvote_status);
  const [upvoteStatus, setupvoteStatus] = useState(upvote_status);
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);
  console.log("user_id", user_id);
  console.log("downvote_status", downvote_status)
  console.log("upvote_status from Downvotes component", upvote_status)

  let op = '';

  const updateDownvote = async () => {
    const data = {
      downvote: voteCount,
      post_id: post_id,
      user_id: user_id
    };

    try {
      const response = await fetch(`http://localhost:5000/api/newsfeed/post/downvote/${op}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // downvote added successfully.
        if(op === 'increment'){
            setdownvoteStatus(true);
            updateDownvoteStatus(true);
            alert("Downvoted successfully");
        }else{
            setdownvoteStatus(false);
            updateDownvoteStatus(false);
            alert("Downvote removed successfully");
        }
        
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handledownvote = async () => {
    setupvoteStatus(getUpvoteStatus());
    if (!downvoteStatus && !upvoteStatus) {
      setdownvoteStatus(true);
      console.log("downvote_status", downvote_status)
      setdownvoteCount(voteCount + 1);
      op = 'increment';
      updateDownvoteStatus(true);
      updateDownvote();
    } else if (downvoteStatus && !upvoteStatus){
      setdownvoteStatus(false);
      setdownvoteCount(voteCount - 1);
      op = 'decrement';
      updateDownvoteStatus(false);
      updateDownvote();
      
    } else {
      alert("You have already upvoted this post. You cannot downvote it.")
    }
  };

  return (
  <IconButton aria-label="downvote" onClick={handledownvote} style={{ color: downvoteStatus ? 'red' : 'inherit' }} disabled={getUpvoteStatus()==true}>
    {downvoteStatus ? <Thumbdown /> : <ThumbdownOutlined />}
    {voteCount}
  </IconButton>
  );
};

export default Downvote;
