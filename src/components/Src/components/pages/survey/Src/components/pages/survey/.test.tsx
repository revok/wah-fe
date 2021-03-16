import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Src/components/pages/survey/ from './Src/components/pages/survey/';

describe('<Src/components/pages/survey/ />', () => {
  test('it should mount', () => {
    render(<Src/components/pages/survey/ />);
    
    const srcComponentsPagesSurvey = screen.getByTestId('Src/components/pages/survey/');

    expect(srcComponentsPagesSurvey).toBeInTheDocument();
  });
});