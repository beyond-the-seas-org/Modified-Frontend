'use client';
import React from 'react';
import LoginForm from '../../components/login/Form';
import Welcome from '../../components/login/Welcome';

const Page = () => {

    // print the local storage
    console.log(localStorage);
    // if the user is already logged in, redirect to the newsfeed page
    if (localStorage.getItem('access_token')) {
        window.location.href = `/newsfeed/${localStorage.getItem('id')}`;
    }

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <Welcome />
            </div>
            <div style={{ flex: 1 }}>
                <LoginForm />
            </div>
        </div>
    );
}

export default Page;
