import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography, Avatar, Checkbox, Favorite } from "@mui/material";
import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete } from "@mui/icons-material";

const Post = ({ post }) => {
  const handleShowComments = () => {
    // Implement logic to show comments here
    console.log("Show Comments clicked for post:", post);
  };

  const handleEditPost = () => {
    // Implement logic to edit post here
    console.log("Edit Post clicked for post:", post);
  };

  const handleDeletePost = () => {
    // Implement logic to delete post here
    console.log("Delete Post clicked for post:", post);
  };

  const handleAddComment = () => {
    // Implement logic to add comment here
    console.log("Add Comment clicked for post:", post);
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post.user_name}
        subheader={post.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.post_desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton aria-label="show comments" onClick={handleShowComments}>
          <ChatBubbleOutline />
        </IconButton>
        <IconButton aria-label="edit post" onClick={handleEditPost}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete post" onClick={handleDeletePost}>
          <Delete />
        </IconButton>
        <IconButton aria-label="add comment" onClick={handleAddComment}>
          <ChatBubbleOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
