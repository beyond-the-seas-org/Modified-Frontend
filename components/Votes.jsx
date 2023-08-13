import React, { useState } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import { ThumbUp, ThumbDown, ThumbUpOutlined, ThumbdownOutlined } from '@mui/icons-material';

const Votes = ({ mode, upvoteCount, downvoteCount, post_id, upvote_status, downvote_status }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reaction, setReaction] = useState(upvote_status ? 'upvote' : downvote_status ? 'downvote' : 'None');
  const [upCount, setUpvoteCount] = useState(upvoteCount);
  const [downCount, setDownvoteCount] = useState(downvoteCount);
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateVote = async ({reaction_type, op, vote_count}) => {

    let data = {
        post_id: post_id,
        user_id: user_id,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/newsfeed/post/${reaction_type}/${op}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Upvote added successfully.
        if(reaction_type === 'upvote'){
            setUpvoteCount(vote_count);
        }else if(reaction_type === 'downvote'){
            setDownvoteCount(vote_count);
        }
        
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReaction = (reactionType) => {
    let op
    if (reaction === reactionType) {
        op = 'decrement';
        reaction === 'upvote' ? updateVote({reaction_type: 'upvote', op: op, vote_count: upCount-1}) : reaction === 'downvote' ? updateVote({reaction_type: 'downvote', op: op, vote_count: downCount-1}) : null;
        setReaction('None'); // Deselect the current reaction
    } else {
        if(reactionType === 'upvote'){
            updateVote({reaction_type: 'upvote', op: 'increment', vote_count: upCount+1});
            if(reaction === 'downvote')
                updateVote({reaction_type: 'downvote', op: 'decrement', vote_count: downCount-1});
        }else if(reactionType === 'downvote'){
            updateVote({reaction_type: 'downvote', op: 'increment', vote_count: downCount+1});
            if(reaction === 'upvote')
                updateVote({reaction_type: 'upvote', op: 'decrement', vote_count: upCount-1});
        }else if(reactionType === 'None'){
            if(reaction === 'upvote'){
                updateVote({reaction_type: 'upvote', op: 'decrement', vote_count: upCount-1});
            }else if(reaction === 'downvote'){
                updateVote({reaction_type: 'downvote', op: 'decrement', vote_count: downCount-1});
            }
            
        }
        
        setReaction(reactionType);

    }
    handleClose();
    // You can perform any API calls or state updates here based on the reactionType
  };

  const open = Boolean(anchorEl);

  return (
    <div>
        <IconButton aria-label="vote" onClick={handleClick} style={{ color: reaction === 'upvote' ? 'blue' : reaction === 'downvote' ? 'red' : 'inherit' }}>
            {reaction === 'upvote' ? <ThumbUp /> : <ThumbUpOutlined style={{ color: mode === 'dark' ? 'white' : 'ActiveBorder'  }} />}
            <Typography variant="body1" style={{ color: mode === 'dark' ? 'white' : 'black' }}> <b>{upCount}</b></Typography>
            {reaction === 'downvote' ? <ThumbDown style={{ marginLeft: '5px' }} /> : <ThumbdownOutlined style={{ color: mode === 'dark' ? 'white' : 'ActiveBorder' , marginLeft: '5px' }} />}
            <Typography variant="body1" style={{ color: mode === 'dark' ? 'white' : 'black', marginLeft: '5px' }}> <b> {downCount} </b></Typography>
        </IconButton>



      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '10px' }}>
          <Typography variant="body1" onClick={() => handleReaction('upvote')} style={{ cursor: 'pointer' }}>
            <ThumbUp color="primary" /> Upvote
          </Typography>
          <Typography variant="body1" onClick={() => handleReaction('downvote')} style={{ cursor: 'pointer' }}>
            <ThumbDown color="error" /> Downvote
          </Typography>
          <Typography variant="body1" onClick={() => handleReaction('None')} style={{ cursor: 'pointer' }}>
            None
          </Typography>
        </div>
      </Popover>
    </div>
  );
};

export default Votes;
