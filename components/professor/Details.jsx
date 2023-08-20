'use client'
import React, { useState, useEffect } from 'react';
// import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";
// import { FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Edit, Delete, ThumbUp, ThumbDown } from "@mui/icons-material";
// import ShowComment from "./ShowComment"
// import EditPost from "./EditPost"
// import DeletePost from "./DeletePost"
// import Votes from "./Votes"
// import StyledButton from "../styled-components/StyledButton"

const ProfessorDetails = ({ }) => {
    const qlink = window.location.href;
    const tokens = qlink.split("/");
    let prof_id = tokens[tokens.length - 2]
    //convert user id to int
    prof_id = parseInt(prof_id);
    console.log("prof_id", prof_id);

    const [details, setDetails] = useState([]);

    useEffect(() => {
        async function showProfDetails() {
            try {
                // Fetch comments from the API
                const response = await fetch(`http://127.0.0.1:5002/api/professors/${prof_id}/get_a_professor_details`);
                const data = await response.json();
                setDetails(data);

                console.log (data)

                // Open the comment dialog
                handleOpenCommentDialog();
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        } showProfDetails();
    }, [])

    // return (
    //     // return a card with the professor details
    //     // we will extract these details from the data[0]:
    //     // name, email, university_name
    //     none
    // );
};

export default ProfessorDetails;