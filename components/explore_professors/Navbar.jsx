import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  FormControlLabel
} from "@mui/material";
import { Mail, Notifications, Pets } from "@mui/icons-material";
import { Radio, RadioGroup } from "@mui/material";

import React, { useState } from "react";

// Import the necessary functions for theming
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  color: "black", // Set font color to black
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
  "& input": {
    // Set the text color inside the input field to black
    color: "black",
  },
  "& .search-options": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({onSearch}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [searchMode, setSearchMode] = useState("name"); // Default mode: search by university


  const handleSearch = () => {
    onSearch(searchTerm, searchMode); // Pass the search term to the parent component
  };

  // Implement live search with event listener..."e" means eventlistener
  const handleLiveSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm, searchMode); // Pass the updated search term and mode to the parent component
  };
  

  return (
    // Wrap the Navbar component with ThemeProvider and pass the darkTheme
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            EXPLORE PROFESSORS
          </Typography>
          <Pets sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <div className="search-options">
              <InputBase // this is the search bar
               placeholder={`search by ${
                searchMode === "university"
                  ? "university"
                  : searchMode === "location"
                  ? "location"
                  : searchMode === "name"
                  ? "name"
                  : "field"
              }...`}
              
                value={searchTerm}
                onChange={handleLiveSearch} // Use handleLiveSearch for live search
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // Trigger search on Enter key
                  }
                }}
              />
              
            </div>
            
          </Search>

          <div>
            <RadioGroup
                aria-label="search-mode"
                name="search-mode"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
                row
              >
                <FormControlLabel value="university" control={<Radio />} label="University" />
                <FormControlLabel value="location" control={<Radio />} label="Location" />
                <FormControlLabel value="field" control={<Radio />} label="Field" />
                <FormControlLabel value="name" control={<Radio />} label="Name" />
              </RadioGroup>
            </div>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>

  );
};

export default Navbar;
