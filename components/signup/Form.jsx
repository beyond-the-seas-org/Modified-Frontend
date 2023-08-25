import { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Paper,
    createTheme,
    ThemeProvider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f44336',
        },
        background: {
            default: '#f5f5f5',
            paper: '#E1F5FE',
        },
    },
    typography: {
        h5: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            padding: '10px 20px',
            fontSize: '1rem'
        }
    }
});

export default function Form() {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        password_hash: '',
        primary_email: '',
        gender: '',
        age: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Endpoint URL (replace with your actual endpoint)
        const apiEndpoint = 'http://127.0.0.1:5001/api/auth/signup';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',  // Assuming you're sending data via POST request
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // If you expect a JSON response, you can parse it
            const data = await response.json();

            // Handle the response or redirect or show a success message, etc.
            console.log("Response from server:", data);

        } catch (error) {
            console.error("There was an error with the fetch operation:", error.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Paper elevation={5} style={{ padding: '40px', borderRadius: '15px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h5" gutterBottom>
                                Create Account
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    name="first_name"
                                    autoComplete="given-name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password_hash"
                                    label="Password"
                                    type="password_hash"
                                    id="password_hash"
                                    autoComplete="current-password_hash"
                                    value={formData.password_hash}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="primary_email"
                                    label="Primary Email"
                                    name="primary_email"
                                    autoComplete="email"
                                    value={formData.primary_email}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        label="Gender"
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: '#0d47a1',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#0d47a1',
                                            boxShadow: 'none',
                                        }
                                    }}
                                >
                                    Join Now
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
