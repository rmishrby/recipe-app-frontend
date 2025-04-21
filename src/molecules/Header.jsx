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
                .get(`${process.env.REACT_APP_API_BASE_URL}/recipes/search`, {
                    params: { query: value, page: 1, size: 10 },
                })
                .then((res) => {
                    if (res.data && Array.isArray(res.data)) {
                        setSuggestions(res.data);
                    } else {
                        setSuggestions([]);
                        setShowNotFound(true);
                    }
                })
                .catch((err) => {
                    console.error('Search error:', err);
                    setSuggestions([]);
                    setShowNotFound(true);
                });
        }, 300); // Reduced debounce time for better responsiveness
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
