// ConductorsContainer.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConductorsContainer from '../Conductors';

describe('ConductorsContainer', () => {
  test('renders ConductorsPresentation', () => {
    const { getByText } = render(<ConductorsContainer />);
    
    // Assert that ConductorsPresentation is rendered
    expect(getByText('Add new Conductor')).toBeInTheDocument();
   
 
  });
});
