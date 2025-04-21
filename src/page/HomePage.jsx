import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from '../molecules/Header';
import RecipeDetails from '../organism/RecipeDetails';
import RecipeList from '../organism/RecipeList';
import RecipePagination from '../atoms/RecipePagination';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import { Alert, Snackbar } from '@mui/material';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(undefined);
    const [showNotFound, setShowNotFound] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/recipes/findAll`,
                    {
                        params: {
                            page: page - 1,
                            size: 5
                        }
                    }
                );
                const data = response.data;
                setRecipeList(data.recipes || []);
                setTotalPages(Math.ceil(data.total / data.limit));
                setError(null);
            } catch (error) {
                console.error('Error fetching recipe list:', error);
                setError('Failed to fetch recipes. Please try again later.');
            }
        };

        fetchRecipes();
    }, [page]);

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                setSelectedRecipe={setSelectedRecipe}
                showNotFound={showNotFound}
                setShowNotFound={setShowNotFound}
            />

            {selectedRecipe ? (
                <RecipeDetails selectedRecipe={selectedRecipe} />
            ) : showNotFound ? (
                <NotFoundPage
                    setSelectedRecipe={setSelectedRecipe}
                    setShowNotFound={setShowNotFound}
                />
            ) : (
                <>
                    <RecipeList
                        recipeList={recipeList}
                        setSelectedRecipe={setSelectedRecipe}
                    />
                    <RecipePagination
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </>
            )}

            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default HomePage;
