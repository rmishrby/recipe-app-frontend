import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage Component', () => {
    const mockSetSelectedRecipe = jest.fn();
    const mockSetShowNotFound = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders not found message correctly', () => {
        render(
            <NotFoundPage
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        expect(screen.getByText('Recipe Not Found')).toBeInTheDocument();
        expect(screen.getByText(/sorry, we couldn't find the recipe you're looking for/i)).toBeInTheDocument();
    });

    it('handles back button click correctly', () => {
        render(
            <NotFoundPage
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const backButton = screen.getByRole('button', { name: /back to search/i });
        fireEvent.click(backButton);

        expect(mockSetSelectedRecipe).toHaveBeenCalledWith(undefined);
        expect(mockSetShowNotFound).toHaveBeenCalledWith(false);
    });

    it('renders with correct styling', () => {
        render(
            <NotFoundPage
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const container = screen.getByTestId('not-found-container');
        expect(container).toHaveStyle({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        });
    });

    it('renders error icon', () => {
        render(
            <NotFoundPage
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const errorIcon = screen.getByTestId('error-icon');
        expect(errorIcon).toBeInTheDocument();
        expect(errorIcon).toHaveStyle({
            fontSize: '4rem',
            color: 'error.main'
        });
    });
}); 