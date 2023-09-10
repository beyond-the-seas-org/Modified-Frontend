'use client'
import { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Chip,
} from '@mui/material';

export default function UpdateProfile() {
    const [user_id, setUser_id] = useState(null);
    const [selectedfields, setSelectedFields] = useState([]);
    const [selectFieldsComboBoxValues, setSelectFieldsComboBoxValues] = useState([]);



    useEffect(() => {
        const user_id = localStorage.getItem('id');
        setUser_id(user_id);

        if (!user_id) {
            window.location.href = '/login';
            return;
        }
    
        const fetchData = async () => {
            const apiEndpoint = `http://127.0.0.1:5001/api/profile/${user_id}`;
            try {
                const response = await fetch(apiEndpoint, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        }
                    });

                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }

                const data = await response.json();

                if (response.status === 200) {
                    setFormData(data);
                } else {
                    alert("Error fetching profile data: " + data.message);
                }
            } catch (error) {
                alert("Error fetching profile data: " + error.message);
            }

            const apiEndpoint_2 = `http://127.0.0.1:5002/api/professors/get_all_fields`;
            try {
                const response = await fetch(apiEndpoint_2, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        }
                    });

                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }

                const data = await response.json();

                if (response.status === 200) {
                    //setFormData(data);
                    const SelectFieldsComboBoxValues =  data.fields.map(field => {
                        return { label: field };
                    });
                    setSelectFieldsComboBoxValues(SelectFieldsComboBoxValues);

                    
                } else {
                    alert("Error fetching fields: " + data.message);
                }
            } catch (error) {
                alert("Error fetching fields " + error.message);
            }
        };
    
        fetchData();
    }, []);  // Empty dependency array means this useEffect runs once when the component mounts.

    
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        primary_email: '',
        secondary_email: '',
        gender: '',
        age: '',
        bsc_year_of_passing: '',
        ms_year_of_passing: '',
        bsc_cgpa: '',
        ms_cgpa: '',
        bsc_university: '',
        ms_university: '',
        github_link: '',
        linkedin_link: '',
        website_link: '',
        current_address: '',
        gre_verbal_quant_score: '',
        gre_awa_score: '',
        toefl_score: '',
        ielts_score: ''
    });

    const handleSeletctedFieldChange = (event) => {
        setSelectedFields(event.target.value);
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiEndpoint = `http://127.0.0.1:5001/api/profile/${user_id}/update`;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 401) {
                window.location.href = '/login';
                return;
            }

            const data = await response.json();
            if (response.status === 200) {
                alert(data.message);
                window.location.href = `/profile`;
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Error updating profile: " + error.message);
        }
    };

    //SelectFieldsComboBoxValues should be filled by all_fields fetched from the backend

    // const SelectFieldsComboBoxValues = [
    //     { label: 'Artificial intilligence' },
    //     { label: 'Machine learning' },
    //     { label: 'Natural language processing' },
    //   ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" align = "center" gutterBottom>Update Profile</Typography>
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}> {/* Left Side */}
                            <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} />
                            <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                            <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                            {/* <TextField fullWidth type="password" label="Password" name="password_hash" onChange={handleChange} /> */}
                            <TextField fullWidth label="Primary Email" name="primary_email" value={formData.primary_email} onChange={handleChange} />
                            <TextField fullWidth label="Secondary Email" name="secondary_email" value={formData.secondary_email} onChange={handleChange} />
                            <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
                            <TextField fullWidth label="B.Sc. Year of Passing" name="bsc_year_of_passing" value={formData.bsc_year_of_passing} onChange={handleChange} />
                            <TextField fullWidth label="M.S. Year of Passing" name="ms_year_of_passing" value={formData.ms_year_of_passing} onChange={handleChange} />
                            <TextField fullWidth label="B.Sc. CGPA" name="bsc_cgpa" value={formData.bsc_cgpa} onChange={handleChange} />
                            <TextField fullWidth label="M.S. CGPA" name="ms_cgpa" value={formData.ms_cgpa} onChange={handleChange} />
                            <TextField fullWidth label="B.Sc. University" name="bsc_university" value={formData.bsc_university} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12} md={6}> {/* Right Side */}
                            <FormControl variant="outlined" style={{ width: 250 }}>
                                <InputLabel>Set your field of interests</InputLabel>
                                <Select
                                    multiple
                                    value={selectedfields}
                                    onChange={handleSeletctedFieldChange}
                                    label="Options"
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                    )}
                                >
                                    {selectFieldsComboBoxValues.map((option) => (
                                    <MenuItem key={option.label} value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField fullWidth label="M.S. University" name="ms_university" value={formData.ms_university} onChange={handleChange} />
                            <TextField fullWidth label="GitHub Link" name="github_link" value={formData.github_link} onChange={handleChange} />
                            <TextField fullWidth label="LinkedIn Link" name="linkedin_link" value={formData.linkedin_link} onChange={handleChange} />
                            <TextField fullWidth label="Website Link" name="website_link" value={formData.website_link} onChange={handleChange} />
                            <TextField fullWidth label="Current Address" name="current_address" value={formData.current_address} onChange={handleChange} multiline rows={3} />
                            <TextField fullWidth label="GRE Verbal & Quant Score" name="gre_verbal_quant_score" value={formData.gre_verbal_quant_score} onChange={handleChange} />
                            <TextField fullWidth label="GRE AWA Score" name="gre_awa_score" value={formData.gre_awa_score} onChange={handleChange} />
                            <TextField fullWidth label="TOEFL Score" name="toefl_score" value={formData.toefl_score} onChange={handleChange} />
                            <TextField fullWidth label="IELTS Score" name="ielts_score" value={formData.ielts_score} onChange={handleChange} />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button variant="contained" color="primary" type="submit" sx={{ width: '100%', py: 1.5, fontSize: '1.2rem' }}>
                            Update
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
