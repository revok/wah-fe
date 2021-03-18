import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginButton from './LoginBtn';

describe('<Login />', () => {
  test('it should mount', () => {
    render(<LoginButton />);
    
    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});