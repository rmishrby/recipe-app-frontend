import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
    const mockSetSelectedRecipe = jest.fn();
    const mockSetShowNotFound = jest.fn();
    const mockPath = '/test-logo.png';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders logo image with correct path', () => {
        render(
            <Logo
                path={mockPath}
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const logoImage = screen.getByRole('img', { name: 'Logo' });
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', mockPath);
    });

    it('handles click event correctly', () => {
        render(
            <Logo
                path={mockPath}
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const logoImage = screen.getByRole('img', { name: 'Logo' });
        fireEvent.click(logoImage);

        expect(mockSetSelectedRecipe).toHaveBeenCalledWith(undefined);
        expect(mockSetShowNotFound).toHaveBeenCalledWith(false);
    });

    it('applies correct styling', () => {
        render(
            <Logo
                path={mockPath}
                setSelectedRecipe={mockSetSelectedRecipe}
                setShowNotFound={mockSetShowNotFound}
            />
        );

        const logoImage = screen.getByRole('img', { name: 'Logo' });
        expect(logoImage).toHaveStyle({
            height: '50px',
            width: '50px',
            borderRadius: '50%',
            cursor: 'pointer'
        });
    });
}); 