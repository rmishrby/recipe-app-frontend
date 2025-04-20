import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RecipeDetails = ({ selectedRecipe }) => {
    return (
        <Box
            sx={{
                p: 4,
                maxWidth: 900,
                margin: '20px auto',
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                gap: 3,
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Box
                component="img"
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                sx={{
                    width: { xs: '100%', sm: 300 },
                    height: 'auto',
                    borderRadius: 2,
                    objectFit: 'cover',
                }}
            />

            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>{selectedRecipe.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Cuisine: {selectedRecipe.cuisine} | Difficulty: {selectedRecipe.difficulty}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Prep Time: {selectedRecipe.prepTimeMinutes} mins | Cook Time: {selectedRecipe.cookTimeMinutes} mins | Servings: {selectedRecipe.servings}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Calories per Serving: {selectedRecipe.caloriesPerServing}cal
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Rating: {selectedRecipe.rating} ⭐ ({selectedRecipe.reviewCount} reviews)
                </Typography>

                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedRecipe.tags?.map((tag, index) => (
                        <Box key={index} sx={{ backgroundColor: '#eee', px: 1.5, py: 0.5, borderRadius: 1 }}>
                            <Typography variant="caption">{tag}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedRecipe.mealType?.map((type, index) => (
                        <Box key={index} sx={{ backgroundColor: '#e0f7fa', px: 1.5, py: 0.5, borderRadius: 1 }}>
                            <Typography variant="caption">{type}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Ingredients:</Typography>
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {selectedRecipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>
                                <Typography variant="body2">{ingredient}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Instructions:</Typography>
                    <ol style={{ paddingLeft: '20px', margin: 0 }}>
                        {selectedRecipe.instructions?.map((step, index) => (
                            <li key={index}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>{step}</Typography>
                            </li>
                        ))}
                    </ol>
                </Box>
            </Box>
        </Box>
    )
}

export default RecipeDetails
