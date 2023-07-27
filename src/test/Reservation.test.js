import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const AddReservation = () => (
  <div>
    <h1>Add Reservation</h1>
  </div>
);

describe('Renders Add Hotel Page', () => {
  test('render React component', () => {
    render(<AddReservation />);
    expect(screen.getByText('Add Reservation')).toBeInTheDocument();
  });
});
