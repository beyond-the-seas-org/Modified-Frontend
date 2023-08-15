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

  /*
  This function is used to update upvote or downvote count.
  reaction_type: upvote or downvote
  op: increment or decrement
  */

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
        // update done successfully.
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

  /*
  This function is used to handle the reaction of the user. 
  Consider the following cases:
  1. If the user has already upvoted the post and clicks on upvote again, then the upvote count will be decremented by 1 and the upvote will be removed.
  2. If the user has already downvoted the post and clicks on upvote, then the downvote count will be decremented by 1 and the upvote count will be incremented by 1.
  These two cases are handled in the first if block.
  In the else block, previous stored reaction state, and the current reaction state is checked and the following cases are handled:
  1. If the current given reaction is upvote, then upvote will be incremented by 1. Now if the prev reaction was None, then we are done. But if the previous reaction was downvote, then we need to decrement the count of downvote by 1.
  This is done in the first part of the else block.
  2. If the current given reaction is downvote, then downvote will be incremented by 1. Now if the prev reaction was None, then we are done. But if the previous reaction was upvote, then we need to decrement the count of upvote by 1.
  This is done in the second part of the else block.
  3. If the previous reaction is upvote and the current reaction is None, then the upvote count will be decremented by 1.
  4. If the previous reaction is downvote and the current reaction is None, then the downvote count will be decremented by 1.
  Cases 3 and 4 are handled in the third part of the else block.
  */
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
      {/*if the reaction variable is set to upvote, then the icon color will be filled with blue.
         else if the reaction variable is set to downvote, then the icon color will be filled with red.
         else it will be filled with white which is inherit color
      */}
        <IconButton aria-label="vote" onClick={handleClick} style={{ color: reaction === 'upvote' ? 'blue' : reaction === 'downvote' ? 'red' : 'inherit' }}>
          {/*If the reaction is set to upvote then ThumbUp icon is chosen to show, else ThumbUpOutlined icon.
          You can get a visualizations of the icons in material ui's website. 
          */}
            {reaction === 'upvote' ? <ThumbUp /> : <ThumbUpOutlined style={{ color: mode === 'dark' ? 'white' : 'ActiveBorder'  }} />}
            <Typography variant="body1" style={{ color: mode === 'dark' ? 'white' : 'black' }}> <b>{upCount}</b></Typography>
            {reaction === 'downvote' ? <ThumbDown style={{ marginLeft: '5px' }} /> : <ThumbdownOutlined style={{ color: mode === 'dark' ? 'white' : 'ActiveBorder' , marginLeft: '5px' }} />}
            <Typography variant="body1" style={{ color: mode === 'dark' ? 'white' : 'black', marginLeft: '5px' }}> <b> {downCount} </b></Typography>
        </IconButton>


      {/* When the reaction button is clicked, this popover shows and provides 3 options: Upvote, Downvote, None */}
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
