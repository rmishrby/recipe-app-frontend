import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes/${id}`);
        setRecipe(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleCloseError = () => {
    setError(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Recipe not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to Search
      </Button>

      <Card>
        {recipe.image && (
          <CardMedia
            component="img"
            height="300"
            image={recipe.image}
            alt={recipe.name}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Cuisine: {recipe.cuisine}
          </Typography>
          {recipe.description && (
            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>
          )}
          {recipe.ingredients && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Ingredients
              </Typography>
              <Typography variant="body1">
                {recipe.ingredients}
              </Typography>
            </Box>
          )}
          {recipe.instructions && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body1">
                {recipe.instructions}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecipeDetails; 