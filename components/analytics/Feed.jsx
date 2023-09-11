'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Location from "./Location";
import EmptyLocation from "./EmptyLocation";

/* Here, location, mode and refreshPosts is received from parent component page.jsx */
const Feed = ({ locations, mode, refreshLocationlist }) => {
    const [loading, setLoading] = useState(false);  // Set loading to false initially
    const [user_id, setuser_id] = useState(null); /*The initial value of user_id is null*/

    useEffect(() => {
        const user_id = localStorage.getItem("id");
        setuser_id(user_id);

        if (!user_id) {
            window.location.href = "/login";
        }

    }, []);

    if (loading)
    {
      return (
        <Box flex={5} p={{ xs: 0, md: 2 }}>
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        </Box>
      );
    }
  
    if (locations && locations.length > 0) {
      return (
        <Box flex={5} p={{ xs: 0, md: 2 }}>
          {locations.map((location) => (
            <Location key={location.id} location={location} refreshLocationlist={refreshLocationlist} mode={mode}/>
          ))}
        </Box>
      );
    }
  
    return (
      <Box flex={5} p={{ xs: 0, md: 2 }} height={"100vh"}>
          <EmptyLocation mode={mode}  />
      </Box>
    );
};

export default Feed;
