'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Location from "./Location";
import EmptyLocation from "./EmptyLocation";

/* Here, location, mode and refreshPosts is received from parent component page.jsx */
const Feed = ({locations , mode, refreshLocationlist}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially

  /*Used to take the user id from the url */
  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let user_id = tokens[tokens.length-1]
  user_id = parseInt(user_id);
  console.log("user_id", user_id);


  return (
    <Box flex={5} p={{ xs: 0, md: 2 }}>
    {loading ? (
        <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
        </Stack>
    ) : locations && locations.length > 0 ? (
        <>
            {locations.map((location) => (
                <Location key={location.id} location={location} refreshLocationlist={refreshLocationlist} mode={mode}/>
            ))}
        </>
    ) : (
        <EmptyLocation mode={mode}  />
    )}
  </Box>  
  );
};

export default Feed;
