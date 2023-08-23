'use client'

import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../../../components/fundings/Navbar";
import Sidebar from "../../../components/fundings/Sidebar";
import Feed from "../../../components/fundings/Feed";

function App() {
  const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
  const [fundings, setFundings] = useState([]); /*The initial value of fundings is an empty array*/
  const [filteredFundings, setfilteredFundings] = useState([]); /*The initial value of filteredFundings is an empty array*/

  /*Get the user id from the url. For example: http://localhost:3000/professors/2. This qlink will take this link*/
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);

  /*Create a Theme instance to enable dark theme or light theme depending on the value of mode */
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  /*When this page.jsx is rendered, the useEffect function will trigger automatically and fetch the posts from
  the server. This is client side rendering as we are using react Hooks(useState, useEffect).
  Therefore we need to mention use client at the top of this file as we are using next-js */
  useEffect(() => {
    async function fetchFundings() {
      try {

        const response = await fetch(`http://localhost:5002/api/professors/get_fundings`);
        const data = await response.json();
        console.log(data) // Print posts to console of the browser
        setFundings(data); 
        setfilteredFundings(data); // Initialize filteredPosts with all posts

      } catch (error) {
        console.error("Error fetching Fundings:", error);
      }
    }
    fetchFundings();
  }, []);

  

  const refreshFundinglist = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/professors/get_fundings`);
      const data = await response.json();
      setFundings(data); 
      setfilteredFundings(data); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error refreshing fundings:', error);
    }
  };


  const handleSearch = (searchTerm, searchMode) => {
    if(searchMode === "professor"){
    const filtered_Fundings = fundings.filter((funding) =>
    funding.professor_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredFundings(filtered_Fundings);
    }else if(searchMode === "field"){
      const filtered_Fundings = fundings.filter((funding) =>
      funding.field_names.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())));
      setfilteredProfessors(filtered_Fundings);
    }
  };


 
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar onSearch={handleSearch} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} user_id={user_id} />
          <Feed mode={mode} fundings={filteredFundings} refreshFundinglist={refreshFundinglist} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;

