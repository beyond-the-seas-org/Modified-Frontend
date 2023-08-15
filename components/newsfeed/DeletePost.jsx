import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';

const DeletePost = ({ post_id, user_id , onOpen, onClose, refreshPosts}) => {

  const handleConfirmDelete = async () => {
    // Send the delete request
    try {
      const response = await fetch(`http://localhost:5000/api/newsfeed/delete_post`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id }),
      });

      if (response.ok) {
        // Post deleted successfully
        console.log('Post deleted successfully');
        alert('Post deleted successfully');
      } else {
        // Handle error
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    refreshPosts();
    // Close the delete confirmation dialog
    onClose();
  };

  return (

    <Dialog open={onOpen} onClose={onClose}>
    <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
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

export default DeletePost;
