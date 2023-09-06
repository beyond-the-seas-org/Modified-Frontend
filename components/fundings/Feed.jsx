'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Funding from "./Funding";
import EmptyFundings from "./EmptyFundings";

/* Here, posts, mode and refreshPosts is received from parent component page.jsx */
const Feed = ({fundings , mode, refreshFundinglist}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially


  return (
    <Box flex={5} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : fundings && fundings.length > 0 ? (
        <>
          {fundings.map((funding) => (
            <Funding key={funding.id} funding={funding} refreshFundinglist={refreshFundinglist} mode={mode}/>
          ))}
        </>
      ) : (
        <EmptyFundings mode={mode}  />
    )}
    </Box>
  );
};

export default Feed;
