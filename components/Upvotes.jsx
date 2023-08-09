'use client'
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

const Upvote = ({ upvoteCount, post_id }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [voteCount, setUpvoteCount] = useState(upvoteCount);
  let op = '';

  useEffect(() => {
    const storedUpvoted = localStorage.getItem(`upvoted-${post_id}`);
    if (storedUpvoted) {
      setUpvoted(storedUpvoted === 'true');
    }
  }, [post_id]);

  const handleUpvote = async () => {
    if (!upvoted) {
      setUpvoted(true);
      setUpvoteCount(voteCount + 1);
      op = 'increment';
    } else {
      setUpvoted(false);
      setUpvoteCount(voteCount - 1);
      op = 'decrement';
    }

    const data = {
      upvote: voteCount,
      post_id: post_id,
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
            setUpvoted(true)
        }else{
            op = 'decrement'
            setUpvoted(false)
        }
        localStorage.setItem(`upvoted-${post_id}`, upvoted.toString());
        alert('Upvote added successfully');
      } else {
        // Handle error
        alert('Failed to add upvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <IconButton aria-label="upvote" onClick={handleUpvote}>
      {upvoted ? <ThumbUp /> : <ThumbUpOutlined />}
      {voteCount}
    </IconButton>
  );
};

export default Upvote;
