import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';
import axios from 'axios';

jest.mock('axios');

const mockSuggestions = [
    { id: 1, name: 'Pasta Carbonara', cuisine: 'Italian' },
    { id: 2, name: 'Chicken Curry', cuisine: 'Indian' },
];

const mockHandleSearch = jest.fn();
const mockSetShowNotFound = jest.fn();
const mockSetSelectedRecipe = jest.fn();

describe('SearchBar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders search input', () => {
        render(
            <SearchBar
                suggestions={mockSuggestions}
                handleSearch={mockHandleSearch}
                setShowNotFound={mockSetShowNotFound}
                showNotFound={false}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        expect(screen.getByPlaceholderText('Search recipes…')).toBeInTheDocument();
    });

    it('calls handleSearch when input changes with minimum length', () => {
        render(
            <SearchBar
                suggestions={mockSuggestions}
                handleSearch={mockHandleSearch}
                setShowNotFound={mockSetShowNotFound}
                showNotFound={false}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const input = screen.getByPlaceholderText('Search recipes…');
        fireEvent.change(input, { target: { value: 'Pas' } });

        expect(mockHandleSearch).toHaveBeenCalledWith('Pas');
    });

    it('handles recipe selection successfully', async () => {
        const mockRecipe = { id: 1, name: 'Pasta Carbonara', cuisine: 'Italian' };
        axios.get.mockResolvedValueOnce({ data: mockRecipe });

        render(
            <SearchBar
                suggestions={mockSuggestions}
                handleSearch={mockHandleSearch}
                setShowNotFound={mockSetShowNotFound}
                showNotFound={false}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const input = screen.getByPlaceholderText('Search recipes…');
        fireEvent.change(input, { target: { value: 'Pasta Carbonara' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        await waitFor(() => {
            expect(mockSetSelectedRecipe).toHaveBeenCalledWith(mockRecipe);
            expect(mockSetShowNotFound).toHaveBeenCalledWith(false);
        });
    });

    it('handles API error gracefully', async () => {
        axios.get.mockRejectedValueOnce(new Error('API Error'));

        render(
            <SearchBar
                suggestions={mockSuggestions}
                handleSearch={mockHandleSearch}
                setShowNotFound={mockSetShowNotFound}
                showNotFound={false}
                setSelectedRecipe={mockSetSelectedRecipe}
            />
        );

        const input = screen.getByPlaceholderText('Search recipes…');
        fireEvent.change(input, { target: { value: 'Pasta Carbonara' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        await waitFor(() => {
            expect(mockSetShowNotFound).toHaveBeenCalledWith(true);
        });
    });
}); 