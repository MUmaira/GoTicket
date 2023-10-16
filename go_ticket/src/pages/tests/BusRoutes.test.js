import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importing directly without /extend-expect
import BusRoutesContainer from './BusRoutes';

describe('BusRoutesContainer', () => {
  test('renders BusRoutesPresentation with initial state', () => {
    const { getByText } = render(<BusRoutesContainer />);
    
    // Assert that BusRoutesPresentation is rendered
    expect(getByText('Available Routes')).toBeInTheDocument();
  });

  test('opens and closes the form correctly', () => {
    const { getByText } = render(<BusRoutesContainer />);

    // Open the form
    fireEvent.click(getByText('Add new Route'));

    // Assert that the form heading is displayed
    expect(getByText('Add New Route')).toBeInTheDocument(); 
    expect(getByText('Submit')).toBeInTheDocument();

    //simulating filling out the form
    fireEvent.change(getByLabelText('Route Number'), { target: { value: '17' } });
    fireEvent.change(getByLabelText('Origin'), { target: { value: 'City A' } });

    // Close the form
    fireEvent.click(getByText('Close Form'));

    // Assert that the form is closed
    expect(queryByText('Add New Route')).toBeNull();
    expect(queryByText('Submit')).toBeNull();
      });
});
