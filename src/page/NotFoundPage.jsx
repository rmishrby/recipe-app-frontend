import React from 'react'
import { Box, Button, Typography } from '@mui/material';

const NotFound = ({ setSelectedRecipe, setShowNotFound }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'rgb(85, 65, 165)',
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The recipe you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={() => {
                setShowNotFound(false)
                setSelectedRecipe(false)
            }} >Back Home</Button>
        </Box>
    );
}

export default NotFound
