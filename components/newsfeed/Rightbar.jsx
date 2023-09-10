import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import LinkIcon from '@mui/icons-material/Link';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';


const Rightbar = () => {
  
  return (
    <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Paper elevation={3} style={{ borderRadius: '15px', padding: '15px', position: 'fixed', width: 280 }}>
        
        <Typography variant="h6" fontWeight={500} style={{ marginBottom: '10px', borderBottom: '2px solid #ddd', paddingBottom: '5px'}} align="center">
        Helpful Links and Tips
        </Typography>
        
        {/* Important Links List */}
        <List style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <ListItem button component="a" href="https://csrankings.org/" target="_blank" style={{ marginBottom: '8px' }}>
            <ListItemIcon>
              <LinkIcon color="primary" style={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="CSRankings" secondary="Computer Science University Rankings" />
          </ListItem>
  
          <ListItem button component="a" href="https://www.usnews.com/best-graduate-schools" target="_blank" style={{ marginBottom: '8px' }}>
            <ListItemIcon>
              <LinkIcon color="primary" style={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="USNews" secondary="Graduate School Rankings" />
          </ListItem>
  
          <ListItem button component="a" href="https://www.thegradcafe.com/" target="_blank" style={{ marginBottom: '8px' }}>
            <ListItemIcon>
              <LinkIcon color="primary" style={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="GradCafe" secondary="Graduate School Admission Results" />
          </ListItem>
        </List>
  
        <Box mt={3} pt={2} borderTop="1px solid #e0e0e0" pl={2} pr={2} bgcolor="#fafafa" borderRadius="4px">
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#4682B4', display: 'flex', alignItems: 'center' }}>
            <InfoIcon style={{ marginRight: '5px', fontSize: '20px', color: '#4682B4' }} />
            Tips:
          </Typography>
          <Typography variant="body2" mt={1.5} style={{ lineHeight: '1.5' }}>
            <Box component="span" display="block" color="#555" mb={0.5} alignItems="center">
              <StarIcon style={{ marginRight: '5px', fontSize: '18px', color: '#4682B4' }} />
              Engage with current students for genuine feedback.
            </Box>
            <Box component="span" display="block" color="#555"  alignItems="center">
              <StarIcon style={{ marginRight: '5px', fontSize: '18px', color: '#4682B4' }} />
              Consider research fit and faculty interests.
            </Box>
          </Typography>
        </Box>
  
      </Paper>
    </Box>
  );
  
};

export default Rightbar;
