'use client'
import Sidebar from "../../components/analytics/Sidebar";
import Feed from "../../components/analytics/Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../../components/analytics/Navbar";
import Rightbar from "../../components/analytics/Rightbar";

import { useState, useEffect } from "react";
import ChatUI from "../../components/chatbot/Chatbot";


function App() {
  const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
  const [locations, setLocations] = useState([]); /*The initial value of locations is an empty array*/
  const [filteredLocations, setfilteredLocations] = useState([]); /*The initial value of filteredLocation is an empty array*/
  const [user_id, setuser_id] = useState(null); /*The initial value of user_id is null*/

  /*Get the user id from the url. For example: http://localhost:3000/analytitcs/2. This qlink will take this link*/

  /*Create a Theme instance to enable dark theme or light theme depending on the value of mode */
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  /*When this page.jsx is rendered, the useEffect function will trigger automatically and fetch the locations from
  the server. This is client side rendering as we are using react Hooks(useState, useEffect).
  Therefore we need to mention use client at the top of this file as we are using next-js */
  useEffect(() => {

    const user_id = localStorage.getItem("id");
    setuser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
    }

    async function fetchLocations() {
      try {

        const response = await fetch(`http://localhost:5003/api/analytics/get_all_locations`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (response.status === 401) {
          window.location.href = "/login";
        }

        const data = await response.json();
        setLocations(data); 
        setfilteredLocations(data); // Initialize filteredlocatios with all locations

      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocations();
  }, []);

  

  const refreshLocationlist = async () => {
    try {

        const response = await fetch(`http://localhost:5003/api/analytics/get_all_locations`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (response.status === 401) {
          window.location.href = "/login";
        }
        const data = await response.json();
        setLocations(data); 
        setfilteredLocations(data); // Initialize filteredlocatios with all locations
        console.log('refreshed');
        console.log(filteredLocations);

      } catch (error) {
        console.error("Error fetching locations when refreshing:", error);
      }
  };

  //this function is called from RightBar of analytics component
  const show_preferable_locations = (data) => {
    try {

        setfilteredLocations(data); // Initialize filteredlocatios with all locations

      } catch (error) {
        console.error("Error fetching locations for showing_preferable_locations:", error);
      }
  };

  /*This will continuously render the filtered locations.
  */

  const handleSearch = (searchTerm, searchMode) => {
    if(searchMode === "location"){
    const filtered_location = locations.filter((location) =>
    location.location_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setfilteredLocations(filtered_location);
    }else if(searchMode === "state"){
    const filtered_location =locations.filter((location) =>
    location.state_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
      setfilteredLocations(filtered_location);
    }else if(searchMode === "country"){
    const filtered_location =locations.filter((location) =>
    location.country_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
      setfilteredLocations(filtered_location);
    }
  };


 
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar onSearch={handleSearch} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} user_id={user_id} />
          <Feed mode={mode} locations={filteredLocations} refreshLocationlist={refreshLocationlist} />
          <Rightbar mode={mode} show_preferable_locations={show_preferable_locations} refreshLocationlist={refreshLocationlist} />

          {/* Create a container for the ChatUI */}
          <div style={{ position: "fixed", bottom: 10, right: 10 }}>
            <ChatUI />
          </div>
        </Stack>

      </Box>
    </ThemeProvider>
  );
}

export default App;

