'use client';
import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import About from '../../../components/profile/About';
import Skills from '../../../components/profile/Skills';
import ActivityFeed from '../../../components/profile/ActivityFeed';
import Links from '../../../components/profile/Links';

const UserProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const qlink = window.location.href;
    const tokens = qlink.split("/");
    let user_id = tokens[tokens.length - 1]
    //convert user id to int
    console.log("user_id", user_id);
  
    user_id = parseInt(user_id);
    useEffect(() => {
        async function fetchUserData() {
            try {
                // Replace with your API endpoint to fetch user profile information
                const response = await fetch(`http://127.0.0.1:5002/api/profile/${user_id}`);

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
            <About aboutInfo={userData.about} />
            <Skills skills={userData.skills} />
            <Links links={userData.links} />
            <ActivityFeed user={userData} />
        </div>
    );
}

export default UserProfilePage;
