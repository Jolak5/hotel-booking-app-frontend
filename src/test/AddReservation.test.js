import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

const ReserveForm = () => (
  <div>
    <h1>Add Reservation form </h1>
  </div>
);

describe('Renders Add Reservation form  Page', () => {
  test('render React component', () => {
    render(<ReserveForm />);
    expect(screen.getByText('Add Reservation form ')).toBeInTheDocument();
  });
});
