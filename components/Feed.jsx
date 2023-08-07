'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import AddPost from "../components/AddPost"
import Add from "../components/Add"

const Feed = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://json-server-for-project.vercel.app/posts');
          const data = await response.json();
          setPosts(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching posts:', error);
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <AddPost/>
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
