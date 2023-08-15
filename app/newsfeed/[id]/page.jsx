'use client'
import Sidebar from "../../../components/newsfeed/Sidebar";
import Feed from "../../../components/newsfeed/Feed";
import Rightbar from "../../../components/newsfeed/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../../../components/newsfeed/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
  const [posts, setPosts] = useState([]); /*The initial value of posts is an empty array*/
  const [filteredPosts, setFilteredPosts] = useState([]); /*The initial value of filteredPosts is an empty array*/

  /*Get the user id from the url. For example: http://localhost:3000/newsfeed/2. This qlink will take this link*/
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
    async function fetchPosts() {
      try {
        const response = await fetch(`http://localhost:5000/api/newsfeed/${user_id}/get_posts`);
        const data = await response.json();
        console.log(data) // Print posts to console of the browser
        setPosts(data); 
        setFilteredPosts(data); // Initialize filteredPosts with all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  /*This function will be called when the user performs any type of modifications, like adding a post, editing a post, deleting a post. 
  This function will be called from AddPost.jsx, EditPost.jsx and DeletePost.jsx*/

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

  /*This will continuously render the filtered posts. Should we continue this or send request to backend?
  Our supervisor was a little bit disappointed with this approach but anyways, he said to continue this for now
  */

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter((post) =>
      post.post_desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };


  /*This is the building block of the newsfeed. The Navbar will show on the top
  The Stack direction is row, which means it will arrange the components horizontally.
  At the left, there will be Sidebar which contains the menu items.
  At the middle, there is the Feed where posts and comments will be shown.
  At the right, there is the Rightbar which does not have any working functionalities currently.
  Rightbar is added for design purposed*/

  /*In react component, we can pass variables, functions.
  For example, <Feed mode={mode}... here mode is the variable name used in Feed component and {mode} is the variable name used in this page.jsx*/
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

