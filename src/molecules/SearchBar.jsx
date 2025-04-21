import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

const SearchBar = ({
    suggestions,
    handleSearch,
    setShowNotFound,
    showNotFound,
    setSelectedRecipe
}) => {
    const [error, setError] = React.useState(null);

    const handleRecipeSelect = async (value, isPartialMatch = false) => {
        try {
            const selected = suggestions.find((item) =>
                isPartialMatch
                    ? item.name.toLowerCase().includes(value.toLowerCase())
                    : item.name === value
            );

            if (!selected) {
                setError('No matching recipe found');
                return;
            }

            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes/${selected.id}`);
            setShowNotFound(false);
            setSelectedRecipe(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching recipe details');
            setShowNotFound(true);
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <>
            <Autocomplete
                freeSolo
                options={suggestions.map((item) => item.name)}
                onInputChange={(event, value) => {
                    if (value.length >= process.env.REACT_APP_MIN_SEARCH_LENGTH) {
                        handleSearch(value);
                    }
                }}
                onChange={(event, value) => {
                    handleRecipeSelect(value);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        const value = event.target.value.trim();
                        if (value.length >= process.env.REACT_APP_MIN_SEARCH_LENGTH) {
                                if (suggestions.length > 0) {
                                    handleRecipeSelect(value, true);
                                } else {
                                    setSelectedRecipe(null);
                                    setShowNotFound(true);
                                }
                        }
                    }
                }}
                sx={{ width: 300, backgroundColor: 'white', borderRadius: 1 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search recipes…"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <SearchIcon sx={{ mr: 1, cursor: 'pointer' }} />,
                        }}
                    />
                )}
            />
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SearchBar;