'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Professor from "./Professor";
import EmptyProfessor from "../explore_professors/EmptyProfessor";

/* Here, professors, mode and refreshProfessorlist is received from parent component page.jsx */
const Feed = ({professors , mode, refreshProfessorlist}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially

  /*Used to take the user id from the url */
  // const qlink = window.location.href;
  // const tokens = qlink.split("/");
  // let user_id = tokens[tokens.length-1]
  // user_id = parseInt(user_id);
  // console.log("user_id", user_id);

  const [user_id, setUserId] = useState(null);

  useEffect(() => {

    const user_id = localStorage.getItem('id');
    setUserId(user_id);

    if (!user_id) {
      navigation.push('/login');
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

  if (professors && professors.length > 0) {
    return (
      <Box flex={5} p={{ xs: 0, md: 2 }}>
        {professors.map((professor) => (
          <Professor key={professor.id} professor={professor} refreshProfessorlist={refreshProfessorlist} mode={mode}/>
        ))}
      </Box>
    );
  }

  return (
    <Box flex={5} p={{ xs: 0, md: 2 }} height={"100vh"}>
        <EmptyProfessor mode={mode}  />
    </Box>
  );
};

export default Feed;
