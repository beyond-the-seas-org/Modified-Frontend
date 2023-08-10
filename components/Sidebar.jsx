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
const Sidebar = ({ mode, setMode }) => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "block" },
        backgroundColor: "#E0E0E0", // Set background color of the sidebar
      }}
    >
      <Box position="fixed" width={250} height="100vh" >
        <List>
        <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
            <ListItemButton component="a" href="#home" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Homepage
                  </Typography>
                } />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Prof Shortlist
                  </Typography>
                } />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Groups
                  </Typography>
                } />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Explore Professors
                  </Typography>
                } />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Analytics
                  </Typography>
                } />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary={
                  <Typography variant="body1" fontWeight="bold">
                    Profile
                  </Typography>
                } />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{
              "&:hover": {
                background: "gray",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
              marginBottom: 4, // Add margin-bottom to create padding between list items
            }}
>
              <ListItemButton component="a" href="#simple-list" style={{ backgroundColor: bgcolor, color: 'black', border: '4px solid black' }}>
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;