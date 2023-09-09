import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
  } from '@mui/material';
  
  const DeleteComment = ({ comment_id, user_id , onOpen, onClose, refreshComments}) => {
    // const qlink = window.location.href;
    // const tokens = qlink.split("/");
    // let id = tokens[tokens.length-1]
    // //convert user id to int
    // const current_user_id = parseInt(id);
    // console.log("user_id", user_id);  
  
    const handleConfirmDelete = async () => {
      // Send the delete request
      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/delete_comment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')} `,
          },
          body: JSON.stringify({ comment_id }),
        });

        if (response.status === 401) {
          // redirect to the login page
          window.location.href = '/login';
          return;
        }
  
        if (response.ok) {
          // comment deleted successfully
          console.log('comment deleted successfully');
          alert('comment deleted successfully');
        } else {
          // Handle error
          console.error('Failed to delete comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      refreshComments();
      // Close the delete confirmation dialog
      onClose();
    };
  
    return (
  
      <Dialog open={onOpen} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
      <DialogActions>
          <Button onClick={onClose} color="primary">
          Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
          Yes
          </Button>
      </DialogActions>
      </Dialog>
  
    );
  };
  
  export default DeleteComment;
  