import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipePagination from '../RecipePagination';

describe('RecipePagination Component', () => {
    const mockSetPage = jest.fn();
    const mockTotalPages = 5;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders pagination with correct total pages', () => {
        render(
            <RecipePagination
                totalPages={mockTotalPages}
                setPage={mockSetPage}
            />
        );

        const pagination = screen.getByRole('navigation');
        expect(pagination).toBeInTheDocument();
        expect(pagination).toHaveAttribute('aria-label', 'pagination');
    });

    it('handles page change correctly', () => {
        render(
            <RecipePagination
                totalPages={mockTotalPages}
                setPage={mockSetPage}
            />
        );

        const pageButton = screen.getByRole('button', { name: /2/i });
        fireEvent.click(pageButton);

        expect(mockSetPage).toHaveBeenCalledWith(2);
    });

    it('renders with single page correctly', () => {
        render(
            <RecipePagination
                totalPages={1}
                setPage={mockSetPage}
            />
        );

        const pagination = screen.getByRole('navigation');
        expect(pagination).toBeInTheDocument();
    });
}); 