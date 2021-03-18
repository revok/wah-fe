import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NeutralIcon from './NeutralIcon';

describe('<NeutralIcon />', () => {
  test('it should mount', () => {
    render(<NeutralIcon />);
    
    const neutralIcon = screen.getByTestId('NeutralIcon');

    expect(neutralIcon).toBeInTheDocument();
  });
});