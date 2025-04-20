import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const SearchBar = ({
    suggestions,
    handleSearch,
    setShowNotFound,
    showNotFound,
    setSelectedRecipe
}) => {

    const handleRecipeSelect = (value, isPartialMatch = false) => {
        const selected = suggestions.find((item) =>
            isPartialMatch
                ? item.name.toLowerCase().includes(value.toLowerCase())
                : item.name === value
        );

        console.log("Selected recipe:", selected);

        if (!selected) {
            console.warn("No matching recipe for:", value);
            // setShowNotFound(true);
            return;
        }

        axios
            .get(`http://localhost:8080/api/recipes/${selected.id}`)
            .then((res) => {
                setShowNotFound(false);
                setSelectedRecipe(res.data);
            })
            .catch((err) => {
                console.error("Error fetching recipe:", err);
                setShowNotFound(true);
            });
    };

    return (
        <Autocomplete
            freeSolo
            options={suggestions.map((item) => item.name)}
            onInputChange={(event, value) => {
                handleSearch(value);
            }}
            onChange={(event, value) => {
                handleRecipeSelect(value);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    const value = event.target.value.trim();

                    handleSearch(value);

                    setTimeout(() => {
                        if (value.length > 2 && suggestions.length > 0) {
                            handleRecipeSelect(value, true);
                        } else {
                            setSelectedRecipe(false)
                            setShowNotFound(true)
                        }
                    }, 1100);
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
        />)
}

export default SearchBar