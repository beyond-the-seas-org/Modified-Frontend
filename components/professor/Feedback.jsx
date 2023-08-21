'use client';
import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';

const FeedbacksComponent = ({ feedbacks }) => {
    return (
        <Box sx={{ 
            width: '80%', 
            margin: '40px auto', 
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', 
            backgroundColor: 'rgba(235, 245, 255, 0.9)', // A very light blue, semi-transparent background
            backdropFilter: 'blur(5px)' // This gives a frosted glass effect
        }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: 3, textAlign: 'center' }}>
                Anonymous Feedbacks
            </Typography>
            
            {feedbacks.map((feedbackDetail, index) => (
                <Card 
                    key={index} 
                    sx={{ 
                        padding: 3, 
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', 
                        borderRadius: '15px',
                        backgroundColor: 'linear-gradient(145deg, #f3f4f6, #e5e7e9)', 
                        marginBottom: 4,
                        transition: '0.3s',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
                        }
                    }}
                >
                    <CardContent>
                        <Typography variant="body1" sx={{ color: '#34495e' }}>
                            "{feedbackDetail.feedback}"
                        </Typography>
                    </CardContent>
                    {index !== feedbacks.length - 1 && <Divider sx={{ marginBottom: 2 }} />}
                </Card>
            ))}
        </Box>
    );
};

export default FeedbacksComponent;
