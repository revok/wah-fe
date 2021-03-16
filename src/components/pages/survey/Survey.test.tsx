import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Survey from './Survey';

describe('<Survey />', () => {
  test('it should mount', () => {
    render(<Survey />);
    
    const survey = screen.getByTestId('Survey');

    expect(survey).toBeInTheDocument();
  });
});