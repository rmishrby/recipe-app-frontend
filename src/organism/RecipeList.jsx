import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from '@mui/material';

const RecipeList = ({ recipeList, setSelectedRecipe }) => {
    const handleFetchRecipe = (id) => {
        axios
            .get(`http://localhost:8080/api/recipes/${id}`)
            .then((response) => setSelectedRecipe(response.data))
            .catch((error) => console.error('Failed to fetch recipe:', error));
    };
    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>All Recipes</Typography>
            {recipeList.map((recipe) => (
                <Box
                    key={recipe.id}
                    sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Link underline="hover" sx={{ cursor: 'pointer' }} onClick={() => handleFetchRecipe(recipe.id)}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {recipe.name}
                            </Typography>
                        </Link>
                        <Typography variant="body2">Cuisine: {recipe.cuisine}</Typography>
                        <Typography variant="body2">
                            Prep: {recipe.prepTimeMinutes} mins | Cook: {recipe.cookTimeMinutes} mins
                        </Typography>
                    </Box>
                    < Box
                        component="img"
                        src={recipe.image}
                        alt={recipe.name}
                        sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                </Box>
            ))}

        </Box>
    )
}

export default RecipeList
