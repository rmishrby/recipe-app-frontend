import React from 'react'
import Logo from '../atoms/Logo'
import LogoPath from '../assets/DishcoveryLogo.png'
import SearchBar from './SearchBar'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useRef } from 'react';

const Header = ({
    suggestions,
    setSuggestions,
    setSelectedRecipe,
    setShowNotFound,
    showNotFound
}) => {

    const debounceRef = useRef(null);

    const handleSearch = (value) => {
        if (value.trim().length < 3) return;

        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            axios
                .get(`http://localhost:8080/api/recipes/search`, {
                    params: { query: value, page: 1, size: 10 },
                })
                .then((res) => setSuggestions(res.data))
                .catch((err) => console.error('Search error:', err));
        }, 1000);
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Logo path={LogoPath} setSelectedRecipe={setSelectedRecipe} setShowNotFound={setShowNotFound} />
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Recipe Finder
                </Typography>
                <Box sx={{ position: 'relative', width: '300px' }}>
                    <SearchBar
                        suggestions={suggestions}
                        handleSearch={handleSearch}
                        setShowNotFound={setShowNotFound}
                        showNotFound={showNotFound}
                        setSelectedRecipe={setSelectedRecipe}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
