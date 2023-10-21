import BusRoutesContainer from '../BusRoutes';
import { getByText, getByLabelText, getByDisplayValue} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 


describe('BusRoutesContainer', () => {
  test('renders BusRoutesPresentation with initial state', () => {
    const { getByText } = render(
    <MemoryRouter>
    <BusRoutesContainer />
    </MemoryRouter>
    );
    
    // Assert that BusRoutesPresentation is rendered
    expect(getByText('Available Routes')).toBeInTheDocument();
  });

  test('opens and closes the form correctly', async () => {
    const { getByText, getByLabelText, queryByText, container } = render(
      <MemoryRouter>
        <BusRoutesContainer />
      </MemoryRouter>
    );
  
    // Opening the form
    fireEvent.click(container.querySelector('.card-header button'));
  
    // Assert that the form heading is displayed
    expect(container.querySelector('.card-header')).toHaveTextContent('Add New Route');
    const submitButton = container.querySelector('input[type="submit"][value="Save"]');
    expect(submitButton).toBeInTheDocument();
  
    // Wait for the form to appear and then simulate filling out the form
    await waitFor(() => {
      fireEvent.change(getByLabelText('Route Number :'), { target: { value: '17' } });
      fireEvent.change(getByLabelText('Origin :'), { target: { value: 'City A' } });
    });
  
    // Closing the form
    fireEvent.click(container.querySelector('.card-header button'));
  
    // Assert that the form is closed
    expect(queryByText('Add New Route')).toBeNull();
    expect(queryByText('Save')).toBeNull();
  });
   
  
});
