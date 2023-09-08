'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import EmptyPost from "../newsfeed/EmptyPost";

/* Here, posts, mode and refreshPosts is received from parent component page.jsx */
const Feed = ({posts , mode, refreshPosts}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially
  const [user_id, setUser_id] = useState(null);  // Set user_id to null initially

  /*Used to take the user id from the url */
  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length-1]
  // user_id = parseInt(user_id);
  // console.log("user_id", user_id);

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    setUser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
      return;
    }
  }, []);

  /* AddPost Component is added at the very beginning. Then all the posts will be displayed
  Map is used to loop through the posts.
  Each post is rendered using Post component.
  When we are using map, we need to pass key as a value which is unique. In this case, post.post_id is unique
  All other necessary variables and functions are passed to the Post Component */
  return (
    <Box flex={3.5} p={{ xs: 0, md: 2 }}>
      <AddPost refreshPosts={refreshPosts} />
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : posts && posts.length > 0 ? (
        <>
            {posts.map((post) => (
                <Post key={post.id} post={post} refreshPosts={refreshPosts} mode={mode}/>
            ))}
        </>
    ) : (
        <EmptyPost mode={mode}  />
    )}
    </Box>
  );
};

export default Feed;
