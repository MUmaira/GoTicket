//ConductorsContainer.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import ConductorsContainer from '../Conductors';


//test case to check whether the container is rendered properly
describe('ConductorsContainer', () => {
  test('renders ConductorsPresentation', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ConductorsContainer />
      </MemoryRouter>
    );

  });
});
