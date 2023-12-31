'use client'
import React, { useState, useEffect } from "react";
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
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

const ChatUI = () => {
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [chats, setChats] = useState([]);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {

    const user_id = localStorage.getItem('id');
    setUser_id(user_id);

    if (!user_id) {
      window.location.href = '/login';
      return;
    }


    async function fetchChats() {
      try {
        const response = await fetch(
          `http://127.0.0.1:5004/api/chatbot/get_all_chats/${user_id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (response.status === 401) {
          window.location.href = "/login";
        }

        const data = await response.json();
        console.log(data);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }
    fetchChats();
  }, [user_id]);

  const handleSend = async () => {
    if (input.trim() !== "") {
      const userMessage = input.trim();
      setInput("");

      setChats((prevChats) => [
        ...prevChats,
        { message: userMessage, msg_from: "user", creation_time: new Date() },
        // { message: botResponse, msg_from: "bot", creation_time: new Date() },
      ]);

      const response = await fetch(
        "http://127.0.0.1:5004/api/chatbot/get_response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({ user_message: userMessage, user_id: user_id }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const botResponse = responseData.bot_response;

        setChats((prevChats) => [
          ...prevChats,
          // { message: userMessage, msg_from: "user", creation_time: new Date() },
          { message: botResponse, msg_from: "bot", creation_time: new Date() },
        ]);
      }
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMinimized ? 10 : 20,
        right: 10,
        height: isMinimized ? "auto" : "500px",
        width: "350px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "purple",
          color: "white",
          p: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">
          Beyond The Seas Chatbot
        </Typography>
        <IconButton onClick={handleMinimize}>
          {isMinimized ? (
            <OfflineBoltIcon
              sx={{ backgroundColor: "white", borderRadius: "50%" }}
            />
          ) : (
            <Button
              sx={{
                minWidth: "24px",
                borderRadius: "40%",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <b>-</b>
            </Button>
          )}
        </IconButton>
      </Box>
      {!isMinimized && (
        <>
          <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {chats.map((chat, index) => (
              <Message key={index} message={chat} />
            ))}
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "background.default",
              display: "flex",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <Grid sx={{ alignSelf: "center" }}>
              <SendIcon
                sx={{ ml: 2, cursor: "pointer", color: "purple" }}
                onClick={handleSend}
              />
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

const Message = ({ message }) => {
  const isBot = message.msg_from === "bot";

  const messageTime = new Date(message.creation_time).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

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
          backgroundColor: isBot ? "primary.light" : "#FFCCFF",
          maxWidth: "70%",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: isBot ? "left" : "right",
            color: "black",
          }}
        >
          {messageTime}
        </Typography>
        <Typography variant="body1">{message.message}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;
