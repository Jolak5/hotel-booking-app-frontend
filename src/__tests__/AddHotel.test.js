import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const AddHotel = () => (
  <div>
    <h1>Add Hotel</h1>
  </div>
);

describe('Renders Add Hotel Page', () => {
  test('render React component', () => {
    render(<AddHotel />);
    expect(screen.getByText('Add Hotel')).toBeInTheDocument();
  });
});
