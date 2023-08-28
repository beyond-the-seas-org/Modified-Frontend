// 'use client'
// import React from 'react';
// import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Divider, Card, CardContent } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CommentIcon from '@mui/icons-material/Comment';

// // Sample data for the activity feed
// const posts = [
//   {
//     id: 1,
//     user: 'John Doe',
//     activity: 'liked your post',
//     time: '2 hours ago',
//   },
//   {
//     id: 2,
//     user: 'Alice Smith',
//     activity: 'commented on your photo',
//     time: '5 hours ago',
//   },
//   {
//     id: 3,
//     user: 'Azizur Rahman',
//     activity: 'shared your article',
//     time: '10 minutes ago',
//   },
//   // Add more activity items as needed
//   {
//     id: 4,
//     user: 'Aziur Rahman',
//     activity: 'visited Professor Smith\'s profile',
//     time: '1 day ago',
//   },
//   {
//     id: 5,
//     user: 'Azizur Rahman',
//     activity: 'liked a post',
//     time: '2 days ago',
//   },
//   // Add more activity items as needed
// ];

// const ActivityContainer = styled(Box)(({ theme }) => ({
//   margin: theme.spacing(2, 0),
// }));

// const ActivityFeed = () => {
//   return (
//     <Box flex={4} p={{ xs: 0, md: 2 }}>
//       <Card>
//         <CardContent>
//           <ActivityContainer>
//             <Typography variant="h6">Activity Feed</Typography>
//             <List>
//               {posts.map((activity) => (
//                 <React.Fragment key={activity.id}>
//                   <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                       <Avatar alt={activity.user} src={`https://example.com/profile-pics/${activity.user}.jpg`} />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={activity.user}
//                       secondary={
//                         <React.Fragment>
//                           {activity.activity}
//                           <Typography variant="body2" color="textSecondary">{activity.time}</Typography>
//                         </React.Fragment>
//                       }
//                     />
//                     <ListItemSecondaryAction>
//                       <IconButton edge="end" aria-label="like">
//                         <FavoriteIcon color="primary" />
//                       </IconButton>
//                       <IconButton edge="end" aria-label="comment">
//                         <CommentIcon color="primary" />
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                   <Divider />
//                 </React.Fragment>
//               ))}
//             </List>
//           </ActivityContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ActivityFeed;

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
