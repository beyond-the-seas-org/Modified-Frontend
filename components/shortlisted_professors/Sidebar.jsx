import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import React from "react";
const bgcolor = "#0A85ED"
const Sidebar = ({ mode, setMode,user_id }) => {
  return (
    <Box
    flex={1.5}
    p={2}
    sx={{
      display: { xs: "none", sm: "block" },
      backgroundColor: mode === "light"
        ? "linear-gradient(45deg, #ece9e6, #ffffff)" 
        : "linear-gradient(45deg, #2c2c2c, #3a3a3a)", // Dark background for sidebar in dark mode
    }}
  >
    <Box position="fixed" width={250} height="100vh" sx={{ overflowY: 'auto' }}>
      <List>
        {[
          { label: "Homepage", icon: <Home />, href: `http://localhost:3000/newsfeed/${user_id}` },
          { label: "Prof Shortlist", icon: <Article />, href: `http://localhost:3000/shortlisted_professors/${user_id}` },
          { label: "Fundings", icon: <Group />, href: `http://localhost:3000/fundings/${user_id}` },
          { label: "Explore Professors", icon: <PersonSearchIcon />, href: `http://localhost:3000/explore_professors/${user_id}` },
          { label: "Analytics", icon: <Settings />, href: `http://localhost:3000/analytics/${user_id}` },
          { label: "Profile", icon: <AccountBox />, href: `http://localhost:3000/profile/${user_id}` }
        ].map((item, idx) => (
          <ListItem
            key={idx}
            disablePadding
            sx={{
              "&:hover": {
                background: mode === "light"
                  ? "rgba(255, 215, 0, 0.15)" 
                  : "rgba(255, 215, 0, 0.3)",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)", // Enhanced hover boxShadow
              },
              marginBottom: 3,
              borderRadius: 2,
            }}
          >
            <ListItemButton 
              component="a" 
              href={item.href} 
              sx={{ 
                backgroundColor: mode === "light"
                  ? "linear-gradient(45deg, #ffffff, #f3f3f3)"
                  : "linear-gradient(45deg, #4a4a4a, #3a3a3a)",
                border: mode === "light"
                  ? '1px solid rgba(0,0,0,0.15)'  // Enhanced border for light mode
                  : '1px solid rgba(255, 255, 255, 0.3)', // Enhanced border for dark mode
                borderRadius: '5px',
                color: mode === "light" ? '#555' : '#ddd',
                boxShadow: mode === "light"
                  ? "0px 2px 5px rgba(0, 0, 0, 0.1)"  // boxShadow for light mode
                  : "0px 2px 5px rgba(0, 0, 0, 0.2)",  // boxShadow for dark mode
                transition: 'all 0.3s'
              }}
            >
              <ListItemIcon sx={{ color: mode === "light" ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {item.label}
                  </Typography>
                } 
              />
            </ListItemButton>
          </ListItem>
        ))}
  
        {/* Separate ListItem for Mode Switch */}
              <ListItem
        disablePadding
        sx={{
          "&:hover": {
            background: mode === "light"
                ? "rgba(255, 215, 0, 0.15)" 
                : "rgba(255, 215, 0, 0.3)", // Hover effect for dark mode
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)", // Enhanced hover boxShadow
          },
          marginBottom: 3,
          borderRadius: 2,
        }}
      >
        <ListItemButton 
          component="a" 
          href="#theme" 
          sx={{ 
            backgroundColor: mode === "light"
                ? "linear-gradient(45deg, #ffffff, #f3f3f3)"
                : "linear-gradient(45deg, #4a4a4a, #3a3a3a)", // Gradient for dark mode buttons
            border: mode === "light"
                ? '1px solid rgba(0,0,0,0.15)'  // Enhanced border for light mode
                : '1px solid rgba(255, 255, 255, 0.3)',  // Enhanced border for dark mode
            borderRadius: '5px',
            color: mode === "light" ? '#555' : '#ddd', // Text color for dark mode
            boxShadow: mode === "light"
                ? "0px 2px 5px rgba(0, 0, 0, 0.1)"  // boxShadow for light mode
                : "0px 2px 5px rgba(0, 0, 0, 0.2)",  // boxShadow for dark mode
            transition: 'all 0.3s'
          }}
        >
          <ListItemIcon sx={{ color: mode === "light" ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)' }}>
            <ModeNight />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1" fontWeight="bold">Dark Mode</Typography>} />
          <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
        </ListItemButton>
      </ListItem>
      </List>
    </Box>
  </Box>
    );
  };
  
  export default Sidebar;
