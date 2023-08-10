'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Feed = ({posts}) => {
  const [loading, setLoading] = useState(false);
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  //convert user id to int
  user_id = parseInt(user_id);
  console.log("user_id", user_id);

  // useEffect(() => {
    // useEffect(() => {
    //   async function fetchPosts() {
    //     try {
    //       const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/${user_id}/get_posts`);
    //       const data = await response.json();
    //       setPosts(data);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error("Error fetching posts:", error);
    //     }
    //   }
    //   fetchPosts();
    // }, []);



  const refreshPosts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/${user_id}/get_posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <AddPost refreshPosts={refreshPosts} />
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post.post_id} post={post} refreshPosts={refreshPosts}/>
          ))}
        </>
      )}
    </Box>
  );
};

export default Feed;
