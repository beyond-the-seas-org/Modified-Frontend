'use client'
import Sidebar from "../../../../components/explore_professors/Sidebar";
import Feed from "../../../../components/explore_professors/Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../../../../components/explore_professors/Navbar";
import { useState, useEffect } from "react";
import ChatUI from "../../../../components/chatbot/Chatbot";


function App() {
  const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
  const [professors, setProfessors] = useState([]); /*The initial value of professors is an empty array*/
  const [filteredProfessors, setfilteredProfessors] = useState([]); /*The initial value of filteredProfessors is an empty array*/
  const [user_id, setuser_id] = useState(null); /*The initial value of user_id is null*/

  /*Get the user id from the url. For example: http://localhost:3000/professors/2. This qlink will take this link*/

  /*Create a Theme instance to enable dark theme or light theme depending on the value of mode */
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  /*When this page.jsx is rendered, the useEffect function will trigger automatically and fetch the professors from
  the server. This is client side rendering as we are using react Hooks(useState, useEffect).
  Therefore we need to mention use client at the top of this file as we are using next-js */
  useEffect(() => {

    const qlink = window.location.href;
    const tokens = qlink.split("/");
    let location_id = tokens[tokens.length-1]
    location_id = parseInt(location_id);
    console.log("location_id", location_id);

    const user_id = localStorage.getItem("id");
    setuser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
    }

    async function fetchProfessors() {
      try {

        const response = await fetch(`http://localhost:5003/api/analytics/${user_id}/${location_id}/get_professors_short_details`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (response.status === 401) {
          window.location.href = "/login";
        }
        const data = await response.json();
        setProfessors(data); 
        setfilteredProfessors(data); // Initialize filteredProfessors with all Professors

      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    }
    fetchProfessors();
  }, []);

  

  const refreshProfessorlist = async () => {
    try {
      const response = await fetch(`http://localhost:5003/api/analytics/${user_id}/${location_id}/get_professors_short_details`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
          });
      if (response.status === 401) {
        window.location.href = "/login";
      }
      const data = await response.json();
      setProfessors(data); 
      setfilteredProfessors(data); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  /*This will continuously render the filtered professors. Should we continue this or send request to backend?
  Our supervisor was a little bit disappointed with this approach but anyways, he said to continue this for now
  */

  const handleSearch = (searchTerm, searchMode) => {
    if(searchMode === "name"){
    const filtered_professors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredProfessors(filtered_professors);
    }else if(searchMode === "university"){
      const filtered_professors = professors.filter((professor) =>
      professor.university_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredProfessors(filtered_professors);
    }else if(searchMode === "location"){
      const filtered_professors = professors.filter((professor) =>
      professor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredProfessors(filtered_professors);
    }else if(searchMode === "field"){
      const filtered_professors = professors.filter((professor) =>
      professor.field_names.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())));
      setfilteredProfessors(filtered_professors);
    }
  };


 
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar onSearch={handleSearch} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} user_id={user_id} />
          <Feed mode={mode} professors={filteredProfessors} refreshProfessorlist={refreshProfessorlist} />
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

