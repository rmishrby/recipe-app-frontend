import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from '../molecules/Header';
import RecipeDetails from '../organism/RecipeDetails';
import RecipeList from '../organism/RecipeList';
import RecipePagination from '../atoms/RecipePagination';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(undefined);
    const [showNotFound, setShowNotFound] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/recipes/findAll?page=${page - 1}&size=5`)
            .then((response) => {
                const data = response.data;
                setRecipeList(data.recipes || []);
                setTotalPages(Math.ceil(data.total / data.limit));
            })
            .catch((error) => {
                console.error('Error fetching recipe list:', error);
            });
    }, [page]);

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
                <RecipeDetails selectedRecipe={selectedRecipe} />) : showNotFound ? <NotFoundPage
                    setSelectedRecipe={setSelectedRecipe}
                    setShowNotFound={setShowNotFound}
                /> :

                (
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
                )
            }

        </Box>
    );
};

export default HomePage;
