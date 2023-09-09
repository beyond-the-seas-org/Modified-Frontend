'use client'
import React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Divider, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const ActivityContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const ActivityFeed = ({ posts }) => {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Card>
        <CardContent>
          <ActivityContainer>
            <Typography variant="h6">Activity Feed</Typography>
            <List>
              {posts.map((post) => (
                <React.Fragment key={post.post_id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {/* You might want to update this Avatar logic based on your real data */}
                      <Avatar alt={post.post_desc} src={`https://example.com/profile-pics/${post.post_id}.jpg`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.post_desc.split('\n').map((part, index) => (<Typography key={index} variant="body2" color="text.secondary">
                        {part ? <b>{part}</b> : <br />}
                      </Typography>))}
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" color="textSecondary">{post.date}</Typography>
                        </React.Fragment>
                      }
                    />
                    {post.post_image && (
                      <  CardMedia
                        component="img"
                        height="20%"
                        image={post.post_image}
                        alt="Paella dish"
                      />
                    )}

                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="like">
                        <FavoriteIcon color="primary" />
                      </IconButton>
                      <IconButton edge="end" aria-label="comment">
                        <CommentIcon color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </ActivityContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityFeed;
