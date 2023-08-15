import React, { useState } from 'react';
import { TextareaAutosize, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import Notification, { showNotification } from '../notification/Notification'; // Import showNotification

/*post_id, initialPostDesc, onOpen, onClose, refreshPosts are received from parent component Post.jsx
post_id: the post id for which edit post button is clicked.
initialPostDesc: Current post which is to be edited.
onOpen: A boolean variable which is set to true when edit post button is clicked and false when Cancel button
is clicked from the edit post box.
onClose: a function in the parent component, Post.jsx, which sets the boolean value described in onOpen to false.
refreshPosts: a function which fetches the posts from the newsfeed service which is then rendered. Thus the effect
of updating a post is shown in the browser.
*/
const EditPost = ({ post_id, initialPostDesc, onOpen, onClose, refreshPosts}) => {
  const [postDesc, setPostDesc] = useState(initialPostDesc);

  const handleEditPost = async () => {
    if (postDesc.trim() !== '') {

      /* This data is sent to newsfeed server as a PUT request */
      const postData = {
        post_id: post_id,
        post_desc: postDesc,
      };

      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/edit_post`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          alert('Post edited successfully')
          setPostDesc('');
          refreshPosts(); // Refresh the posts to show the updated post
          onClose(); // Close the dialog box
        } else {
          // Handle error
          console.error('Failed to edit post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    /*This dialog box is shown when the open variable has value True and it is closed when onClose() function is called.*/
    <Dialog open={onOpen} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
      <Box /*sx is used to provide custom style to a material ui component */
        sx={{
          width: '100%',
          backgroundColor: 'lightgray', // Custom background color
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '8px', // Add padding for better visual
        }}
      >
        <TextareaAutosize /*properties of the text box used for editing the comment. I couldn't custom edit the width of this box. you may try? */
          minRows={4} 
          value={postDesc}
          onChange={(e) => setPostDesc(e.target.value)}
          placeholder="Edit your post..."
          style={{ width: '400 px', color: 'black', border: '2px solid black'}}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{backgroundColor:'#FF3333', color: 'black' , border: '2px solid black'}}> <b>Cancel</b></Button>
        <Button  onClick={handleEditPost} style={{backgroundColor: '#33FF33', color: 'black', border: '2px solid black'}}>
          <b>Save Changes</b> {/*Name of the button is provided here*/}
        </Button>
        {/*Notification component is used to show the notification when the post is edited successfully. But sadly this feature does not work.*/}
        <Notification />
      </DialogActions>
    </Dialog>
  );
};

export default EditPost;
