'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/get_posts`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts from post component:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const refreshPosts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/newsfeed/get_posts`);
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
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Feed;
