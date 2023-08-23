'use client'
import Sidebar from "../../../components/explore_professors/Sidebar";
import Feed from "../../../components/explore_professors/Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../../../components/explore_professors/Navbar";
import { useState, useEffect } from "react";


function App() {
  const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
  const [professors, setProfessors] = useState([]); /*The initial value of professors is an empty array*/
  const [filteredProfessors, setfilteredProfessors] = useState([]); /*The initial value of filteredProfessors is an empty array*/

  /*Get the user id from the url. For example: http://localhost:3000/professors/2. This qlink will take this link*/
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

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
    async function fetchProfessors() {
      try {

        const response = await fetch(`http://localhost:5002/api/professors/get_all_professor_short_details`);
        const data = await response.json();
        console.log(data) // Print posts to console of the browser
        setProfessors(data); 
        setfilteredProfessors(data); // Initialize filteredPosts with all posts

        // //creating dummy professors
        // const professor_1 = {
        //     professor_id: 1,
        //     name: "Md. Shamsuzzoha Bayezid",
        //     website_link: "http://cse.edu.ac.bd/bayezid/details",
        //     email: "bayezid2023@gmail.com",
        //     university_name : "Bangladesh University of Engineering and Technology",
        //     citations : 4068,
        //     h_index : 16,
        //     field_names : ["Computational Biology","Phylogenetic Trees"]
        //   };

        // const professor_2 = {
        //     professor_id: 2,
        //     name: "Md. Shamsuzzoha Bayezid",
        //     website_link: "http://cse.edu.ac.bd/bayezid/details",
        //     email: "bayezid2023@gmail.com",
        //     university_name : "Bangladesh University of Engineering and Technology",
        //     citations : 4068,
        //     h_index : 16,
        //     field_names : ["Computational Biology","Phylogenetic Trees"]
        //   };
        
        // const professor_3 = {
        // professor_id: 3,
        // name: "Saifur Rahman",
        // website_link: "http://cse.edu.ac.bd/bayezid/details",
        // email: "bayezid2023@gmail.com",
        // university_name : "Bangladesh University of Engineering and Technology",
        // citations : 4068,
        // h_index : 16,
        // field_names : ["Computational Biology","Phylogenetic Trees"]
        // };


        // let professors =[]
        // professors.push(professor_1)
        // professors.push(professor_2)
        // professors.push(professor_3)

        // setProfessors(professors)
        // setfilteredProfessors(professors)
                


      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    }
    fetchProfessors();
  }, []);

  

  const refreshProfessorlist = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/professors/get_all_professor_short_details`);
      const data = await response.json();
      setProfessors(data); 
      setfilteredProfessors(data); // Initialize filteredPosts with all posts
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  /*This will continuously render the filtered posts. Should we continue this or send request to backend?
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
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;

