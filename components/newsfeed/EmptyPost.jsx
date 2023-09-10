'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const EmptyPost = ({ mode }) => {
  useEffect(() => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      window.location.href = "/login";
      return;
    }
  }, []);

  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoPostsMessage(true);
    }, 10000); // 30 seconds

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, []);

  return (
    <div>
    <Card sx={{ 
      margin: 5 , 
      borderColor: mode === 'dark' ? 'white' : 'black' ,
      borderWidth: '2px', 
      borderStyle: 'solid',
      borderRadius: 4,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div" align="center">
            {showNoPostsMessage ? 'No posts found' : 'Loading Posts, Please Wait!'}

          </Typography>
        }
      />
    </Card>
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    </div>
    </div>
  );
};

export default EmptyPost;
