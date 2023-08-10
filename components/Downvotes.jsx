'use client'
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Thumbdown, ThumbdownOutlined } from '@mui/icons-material';

const Downvote = ({ downvoteCount, post_id }) => {
  const [downvoted, setdownvoted] = useState(false);
  const [voteCount, setdownvoteCount] = useState(downvoteCount);
  let op = '';

  useEffect(() => {
    const storeddownvoted = localStorage.getItem(`downvoted-${post_id}`);
    if (storeddownvoted) {
      setdownvoted(storeddownvoted === 'true');
    }
  }, [post_id]);

  const handledownvote = async () => {
    if (!downvoted) {
      setdownvoted(true);
      setdownvoteCount(voteCount + 1);
      op = 'increment';
    } else {
      setdownvoted(false);
      setdownvoteCount(voteCount - 1);
      op = 'decrement';
    }

    const data = {
      downvote: voteCount,
      post_id: post_id,
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
            setdownvoted(true)
        }else{
            op = 'decrement'
            setdownvoted(false)
        }
        localStorage.setItem(`downvoted-${post_id}`, downvoted.toString());
        alert('downvote added successfully');
      } else {
        // Handle error
        alert('Failed to add downvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <IconButton aria-label="downvote" onClick={handledownvote} style={{ color: downvoted ? 'red' : 'inherit' }}>
    {downvoted ? <Thumbdown /> : <ThumbdownOutlined />}
    {voteCount}
  </IconButton>
  );
};

export default Downvote;
