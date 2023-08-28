'use client'
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';  // Import the Box component
import ProfileHeader from '../../../components/profile/ProfileHeader';
import About from '../../../components/profile/About';
import Skills from '../../../components/profile/Skills';
import ActivityFeed from '../../../components/profile/ActivityFeed';
import Links from '../../../components/profile/Links';
import TestScores from '../../../components/profile/TestScores';

const UserProfilePage = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const qlink = window.location.href;
    const tokens = qlink.split("/");
    let user_id = tokens[tokens.length - 1];

    user_id = parseInt(user_id);
    useEffect(() => {
        async function fetchUserData() {
            try {
                // Replace with your API endpoint to fetch user profile information
                const response = await fetch(`http://127.0.0.1:5001/api/profile/${user_id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user data.');
                }

                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ProfileHeader userData={userData} />
            <About aboutInfo={userData} />
            {/* <Skills skills={userData} /> */}
            
            {/* Flex container for Links and TestScores */}
            <Box display="flex" justifyContent="space-between" my={2} mx={3}>
                <Box flex={1} mr={2}>
                    <Links links={userData} />
                </Box>
                <Box flex={1} ml={2}>
                    <TestScores testScores={userData} />
                </Box>
            </Box>

            <ActivityFeed user={userData} />
        </div>
    );
}

export default UserProfilePage;
