'use client'
import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

const messages = [
    { id: 1, text: "Hi there!", sender: "bot" },
    { id: 2, text: "Hello!", sender: "user" },
    { id: 3, text: "How can I assist you today?", sender: "bot" },
    { id: 4, text: "I have a question about your services.", sender: "user" },
    { id: 5, text: "Sure, feel free to ask!", sender: "bot" },
    // ... more messages ...
  ];
const ChatUI = () => {
  const [input, setInput] = React.useState("");
  const [isMinimized, setIsMinimized] = React.useState(true);

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Box sx={{ position: "fixed", bottom: isMinimized ? 10 : 20, right: 10, height: isMinimized ? "auto" : "500px", width: "350px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", borderRadius: "8px", display: "flex", flexDirection: "column", backgroundColor: "white" }}>
      <Box sx={{ backgroundColor: "purple", color: "white", p: 2, textAlign: "center", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1">Beyond The Seas Chatbot</Typography>
        <IconButton onClick={handleMinimize}>
            {isMinimized ? (
                <OfflineBoltIcon sx={{ backgroundColor: "white", borderRadius: "50%" }} />
                ) : (
                <Button sx={{ minWidth: "24px", borderRadius: "40%", backgroundColor: "white", color: "black", fontWeight: "bold" }}> <b>-</b></Button>
            ) }
        </IconButton>
      </Box>
      {!isMinimized && (
        <>
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </Box>
          <Box sx={{ p: 2, backgroundColor: "background.default", display: "flex" }}>
            <TextField
              fullWidth
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
            />
            <Grid sx={{ alignSelf: "center" }}>
              <SendIcon sx={{ ml: 2, cursor: "pointer", color: "purple" }} onClick={handleSend} />
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
          maxWidth: "70%", // Adjust the max width of messages
          borderRadius: "8px", // Add some border radius to messages
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;
