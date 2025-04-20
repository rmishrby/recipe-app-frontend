import React from 'react'
import Box from '@mui/material/Box';

const Logo = ({ path, setSelectedRecipe, setShowNotFound }) => {
    return (
        <Box
            component="img"
            src={path}
            alt="Logo"
            sx={{
                height: 50,
                width: 50,
                borderRadius: '50%',
                objectFit: 'cover',
                mr: 2,
                display: 'inline-block',
                verticalAlign: 'middle',
                cursor: 'pointer',
            }}
            onClick={() => {
                setShowNotFound(false)
                setSelectedRecipe(undefined)
            }} />
    )
}

export default Logo;

