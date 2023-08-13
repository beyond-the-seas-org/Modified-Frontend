import React from 'react';
import { Button, Box } from '@mui/material';

const StyledButton = ({ label, onClick, backgroundColor, hoverBackgroundColor, ...props }) => {
  return (
    <Box
      sx={{
        margin: '0 10px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        color: 'black',
        border: '2px solid black',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Button onClick={onClick} {...props} style={{color: 'black', alignItems: 'center', justifyContent:'center'}}>
       <b>{label}</b>
      </Button>
    </Box>
  );
};

export default StyledButton;
