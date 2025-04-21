import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import HomePage from '../HomePage';

jest.mock('axios');

describe('HomePage Component', () => {
    const mockRecipeList = {
        recipes: [
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
        ],
        total: 2,
        limit: 5
    };

    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockResolvedValue({ data: mockRecipeList });
    });

    it('renders header component', () => {
        render(<HomePage />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('fetches and displays recipe list on mount', async () => {
        render(<HomePage />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/recipes/findAll'),
                expect.any(Object)
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
            expect(screen.getByText('Test Recipe 2')).toBeInTheDocument();
        });
    });

    it('handles API error gracefully', async () => {
        const errorMessage = 'Failed to fetch recipes';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('updates recipe list when page changes', async () => {
        render(<HomePage />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/recipes/findAll'),
                expect.objectContaining({
                    params: expect.objectContaining({
                        page: 0,
                        size: 5
                    })
                })
            );
        });

        // Simulate page change
        const nextPageButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextPageButton);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/recipes/findAll'),
                expect.objectContaining({
                    params: expect.objectContaining({
                        page: 1,
                        size: 5
                    })
                })
            );
        });
    });

    it('shows not found page when no recipes are available', async () => {
        axios.get.mockResolvedValueOnce({ data: { recipes: [], total: 0, limit: 5 } });

        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('No recipes found')).toBeInTheDocument();
        });
    });

    it('handles recipe selection correctly', async () => {
        render(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
        });

        const firstRecipe = screen.getByText('Test Recipe 1').closest('div');
        fireEvent.click(firstRecipe);

        await waitFor(() => {
            expect(screen.getByText('Test description 1')).toBeInTheDocument();
        });
    });
}); 