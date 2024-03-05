import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HeartIcon from './HeartIcon';
import '@testing-library/jest-dom';
import 'mutationobserver-shim';

describe('HeartIcon', () => {
    test('toggles heart icon and updates favourite status on click', () => {
        const mockRecipe = {
            id: 1,
            isFavourite: false
        };

        const { getByRole } = render(<HeartIcon selectedRecipe={mockRecipe} />)
        const heartIcon = getByRole('img')

        expect(heartIcon).toHaveClass('svg-icon-heart-empty');

        fireEvent.click(heartIcon);

        expect(heartIcon).toHaveClass('svg-icon-heart')
    });
});