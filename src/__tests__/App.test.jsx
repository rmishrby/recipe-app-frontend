import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the lazy-loaded components
jest.mock('../page/HomePage', () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('../page/RecipeDetails', () => {
  return function MockRecipeDetails() {
    return <div data-testid="recipe-details">Recipe Details</div>;
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders HomePage component on root path', async () => {
    window.history.pushState({}, '', '/');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for the lazy-loaded component
    const homePage = await screen.findByTestId('home-page');
    expect(homePage).toBeInTheDocument();
  });

  it('renders RecipeDetails component on recipe path', async () => {
    window.history.pushState({}, '', '/recipe/1');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for the lazy-loaded component
    const recipeDetails = await screen.findByTestId('recipe-details');
    expect(recipeDetails).toBeInTheDocument();
  });
}); 
 