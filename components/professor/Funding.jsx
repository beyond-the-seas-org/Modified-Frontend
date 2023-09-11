import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Chip,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slider
} from '@mui/material';
import { Link as MUILink } from '@mui/material';

const FundingDetailsCard = ({ fundingDetails }) => {
    const [matchingProfiles, setMatchingProfiles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);
    const [user_id, setUser_id] = useState(null);

    useEffect(() => {
        const user_id = localStorage.getItem('id');
        setUser_id(user_id);
    }, []);

    const fetchMatchingProfiles = async (professor_id, funding_id) => {
        try {
            // Construct the URL based on professor_id (assuming it's the student_id) and funding_id
            const url = `http://127.0.0.1:5002/api/professors/${user_id}/${funding_id}/get_student_profile_matching`;

            const response = await fetch(url, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')} `
                        }
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
            }

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setMatchingProfiles(data);
            setSliderValue(data.similarity);
            setOpenDialog(true);
        } catch (error) {
            console.error("Error fetching matching profiles:", error);
        }
    }


    const handleClose = () => {
        setOpenDialog(false);
    };

    if (!fundingDetails || fundingDetails.length === 0) {
        return (
            <Typography variant="body2" color="textSecondary">
                No funding details found.
            </Typography>
        );
    }

    return (
        <>
            {fundingDetails.map((funding, index) => (
                <Card
                    key={index}
                    sx={{
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: '15px',
                        backgroundColor: 'background.paper',
                        marginBottom: 4,
                        mt: 3,
                        position: 'relative'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
                            Funding Announcement: {new Date(funding.date).toLocaleDateString()}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '1.2rem' }}>
                            {funding.funding_post}
                        </Typography>

                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                            Requirement: {funding.requirement_description}
                        </Typography>

                        <Divider sx={{ marginBottom: 2 }} />

                        <Chip
                            label={`Available Slots: ${funding.num_of_slot}`}
                            variant="outlined"
                            color={funding.availability ? 'primary' : 'secondary'}
                            sx={{ marginRight: 1 }}
                        />
                        <Chip
                            label={`Funding Amount: $${funding.amount}`}
                            variant="outlined"
                            color="info"
                            sx={{ marginRight: 1 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button
                                variant="outlined"
                                onClick={() => fetchMatchingProfiles(funding.professor_id, funding.amount)}
                                sx={{
                                    background: 'linear-gradient(45deg, #3498db 30%, #2c3e50 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(52, 152, 219, .3)',
                                }}
                            >
                                Match My Profile
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            {/* Popup Dialog */}
            {/*... (The same dialog you provided) ...*/}
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">{"Matching Profiles"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            matchingProfiles ? (
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    {/* {matchingProfiles.similarity} */}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No matching profiles found.
                                </Typography>
                            )
                        }
                    </DialogContentText>
                    <Box sx={{ marginTop: 3 }}>
                        <Typography gutterBottom>Predicted Match Percentage: {sliderValue}%</Typography>
                        <Slider
                            value={sliderValue}
                            onChange={(event, newValue) => setSliderValue(newValue)}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            marks
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            sx={{
                                color: 'linear-gradient(45deg, #FE6B8B 30%, #3498db 90%)',
                            }}
                            readOnly
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default FundingDetailsCard;
