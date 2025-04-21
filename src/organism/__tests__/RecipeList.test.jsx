import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeList from '../RecipeList';

describe('RecipeList Component', () => {
    const mockRecipeList = [
        {
            id: 1,
            name: 'Test Recipe 1',
            cuisine: 'Italian',
            description: 'Test description 1',
            image: 'test-image-1.jpg'
        },
        {
            id: 2,
            name: 'Test Recipe 2',
            cuisine: 'Indian',
            description: 'Test description 2',
            image: 'test-image-2.jpg'
        }
    ];

    const mockSetSelectedRecipe = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders recipe list correctly', () => {
        render(
            <RecipeList
                recipeList={mockRecipeList}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
        expect(screen.getByText('Test Recipe 2')).toBeInTheDocument();
        expect(screen.getByText('Italian')).toBeInTheDocument();
        expect(screen.getByText('Indian')).toBeInTheDocument();
    });

    it('renders recipe images correctly', () => {
        render(
            <RecipeList
                recipeList={mockRecipeList}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'test-image-1.jpg');
        expect(images[1]).toHaveAttribute('src', 'test-image-2.jpg');
    });

    it('handles recipe selection correctly', () => {
        render(
            <RecipeList
                recipeList={mockRecipeList}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const firstRecipe = screen.getByText('Test Recipe 1').closest('div');
        fireEvent.click(firstRecipe);

        expect(mockSetSelectedRecipe).toHaveBeenCalledWith(mockRecipeList[0]);
    });

    it('renders empty state correctly', () => {
        render(
            <RecipeList
                recipeList={[]}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        expect(screen.getByText('No recipes found')).toBeInTheDocument();
    });

    it('applies correct styling to recipe cards', () => {
        render(
            <RecipeList
                recipeList={mockRecipeList}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const cards = screen.getAllByTestId('recipe-card');
        cards.forEach(card => {
            expect(card).toHaveStyle({
                cursor: 'pointer'
            });
        });
    });
}); 