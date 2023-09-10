'use client'
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';  // Import the Box component
import ProfileHeader from '../../components/profile/ProfileHeader';
import About from '../../components/profile/About';
import Skills from '../../components/profile/Skills';
import ActivityFeed from '../../components/profile/ActivityFeed';
import Links from '../../components/profile/Links';
import TestScores from '../../components/profile/TestScores';

const UserProfilePage = () => {
    const [userData, setUserData] = useState();
    const [ownPosts, setOwnPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user_id, setUser_id] = useState(null);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('id');
        const refresh_token = localStorage.getItem('refresh_token');
        setUser_id(user_id);

        if (!access_token || !user_id || !refresh_token) {
            window.location.href = '/login';
            return;
        }

        async function fetchUserData() {
            try {
                // Replace with your API endpoint to fetch user profile information
                const response = await fetch(`http://127.0.0.1:5001/api/profile/${user_id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                }});

                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }

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

            try{
                const own_posts = await fetch(`http://127.0.0.1:5001/api/profile/${user_id}/own_posts`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        }});

                if (own_posts.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                
                if (!own_posts.ok) {
                    throw new Error('Failed to fetch own post data.');
                }
                const posts = await own_posts.json();
                setOwnPosts(posts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) return;
    if (error) return;

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

            <ActivityFeed posts={ownPosts} />
        </div>
    );
}

export default UserProfilePage;
