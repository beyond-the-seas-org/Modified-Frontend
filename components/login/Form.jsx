'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//     Button,
//     Container,
//     TextField,
//     Typography,
//     Box,
//     Paper,
//     createTheme,
//     ThemeProvider
// } from '@mui/material';

// const theme = createTheme({
//     palette: {
//         type: 'light',
//         primary: {
//             main: '#1976d2',
//         },
//         secondary: {
//             main: '#f44336',
//         },
//         background: {
//             default: '#f5f5f5',
//             paper: '#E1F5FE',
//         },
//     },
//     typography: {
//         h5: {
//             fontWeight: 600,
//         },
//         button: {
//             textTransform: 'none',
//             padding: '10px 20px',
//             fontSize: '1rem'
//         }
//     }
// });

// export default function LoginForm() {
//     const [loginData, setLoginData] = useState({
//         username: '',
//         password_hash: ''
//     });

//     const navigation = useRouter();

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setLoginData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleLogin = async (event) => {
//         event.preventDefault();

//         const apiEndpoint = 'http://127.0.0.1:5001/api/auth/login';

//         try {
//             const response = await fetch(apiEndpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginData)
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();

//             if (data.access_token) {
//                 localStorage.setItem(data.id, data.access_token);
//                 navigation.push(`/newsfeed/${data.id}`);
//             } else {
//                 console.error("Failed login attempt.");
//             }

//         } catch (error) {
//             console.error("There was an error with the fetch operation:", error.message);
//         }
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box
//                 sx={{
//                     height: '100vh',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
//                 }}
//             >
//                 <Container component="main" maxWidth="xs">
//                     <Paper elevation={5} style={{ padding: '40px', borderRadius: '15px' }}>
//                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                             <Typography component="h1" variant="h5" gutterBottom>
//                                 Login
//                             </Typography>
//                             <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="username"
//                                     label="Username"
//                                     name="username"
//                                     autoComplete="username"
//                                     value={loginData.username}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     variant="outlined"
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="password_hash"
//                                     label="Password"
//                                     type="password"
//                                     id="password_hash"
//                                     autoComplete="current-password"
//                                     value={loginData.password_hash}
//                                     onChange={handleChange}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={{
//                                         mt: 3,
//                                         mb: 2,
//                                         backgroundColor: '#0d47a1',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         '&:hover': {
//                                             backgroundColor: '#0d47a1',
//                                             boxShadow: 'none',
//                                         }
//                                     }}
//                                 >
//                                     Login
//                                 </Button>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 </Container>
//             </Box>
//         </ThemeProvider>
//     );
// }

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, TextField, Typography, Box, Paper, createTheme, ThemeProvider, Divider } from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: '#1976d2', },
        secondary: { main: '#f44336', },
        background: { default: '#f5f5f5', paper: '#E1F5FE', },
    },
    typography: {
        h5: { fontWeight: 600, },
        button: { textTransform: 'none', padding: '10px 20px', fontSize: '1rem' }
    }
});

export default function LoginForm() {
    const [loginData, setLoginData] = useState({ username: '', password_hash: '' });
    const navigation = useRouter();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleLogin = async (event) => {
        event.preventDefault();
        const apiEndpoint = 'http://127.0.0.1:5001/api/auth/login';
    
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                if (data.access_token) {
                    localStorage.setItem(data.id, data.access_token);
                    navigation.push(`/newsfeed/${data.id}`);
                    alert("Login successful! Redirecting...")
                } else {
                    alert("Login failed. Please try again.");
                }
            } else {
                if (response.status === 404) {
                    if (data.message === "User profile not found.") {
                        alert("Error: User Profile Not Found. Please Sign Up First!");
                    } else if (data.message === "Incorrect password.") {
                        alert("Error: Incorrect Password. Please Try Again!");
                    } else {
                        alert(`Unknown error: ${data.message}`);
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
        } catch (error) {
            alert("Error during the login process. Please try again.");
        }
    };
    
    

return (
    <ThemeProvider theme={theme}>
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundImage: 'linear-gradient(120deg, #89CFF0, #0057A8)'  // updated blue gradient
            }}
        >
            <Typography variant="h6">Already a member? Please login to explore!</Typography>
            <Divider style={{ margin: '20px 0', width: '80%' }} />
            <Container component="main" maxWidth="xs">
                <Paper elevation={5} style={{ padding: '40px', borderRadius: '15px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5">Login</Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
                            <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" value={loginData.username} onChange={handleChange} />
                            <TextField variant="outlined" margin="normal" required fullWidth name="password_hash" label="Password" type="password" id="password_hash" autoComplete="current-password" value={loginData.password_hash} onChange={handleChange} />
                            <Button type="submit" fullWidth variant="outlined" sx={{marginTop: '20px', borderColor: 'black', color: 'black'}}>Login</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    </ThemeProvider>
);

}
