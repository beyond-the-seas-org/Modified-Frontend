'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Professor from "./Professor";
import EmptyProfessor from "../shortlisted_professors/EmptyProfessor";

/* Here, professors, mode and refreshProfessorlist is received from parent component page.jsx */
const Feed = ({professors , mode, refreshProfessorlist}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    setUser_id(user_id);

    if(!user_id){
      window.location.href = '/login';
    }

  }, []);



  return (
    <Box flex={5} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : professors && professors.length > 0 ? (
        <>
            {professors.map((professor) => (
                <Professor key={professor.id} professor={professor} refreshProfessorlist={refreshProfessorlist} mode={mode}/>
            ))}
        </>
    ) : (
        <EmptyProfessor mode={mode}  />
    )}
    </Box>
  );
};

export default Feed;
