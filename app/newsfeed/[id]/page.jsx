'use client'
import Sidebar from "../../../components/Sidebar";
import Feed from "../../../components/Feed";
import Rightbar from "../../../components/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/${user_id}/get_posts`);
        const data = await response.json();
        console.log(data)
        setPosts(data); 
        setFilteredPosts(data); // Initialize filteredPosts with all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const refreshPosts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/${user_id}/get_posts`);
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const filtered = posts.filter((post) =>
      post.post_desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar onSearch={handleSearch} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Feed mode={mode} posts={filteredPosts} refreshPosts={refreshPosts} />
          <Rightbar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;

