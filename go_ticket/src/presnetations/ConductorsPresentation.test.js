// ConductorsPresentation.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import ConductorsPresentation from './ConductorsPresentation';

describe('ConductorsPresentation', () => {
  test('renders Conductor Details heading', () => {
    render(
      <MemoryRouter>
        <ConductorsPresentation />
      </MemoryRouter>
    );

    const headingElement = screen.getByText('Conductor Details');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders Add new Conductor button', () => {
    render(
      <MemoryRouter>
        <ConductorsPresentation />
      </MemoryRouter>
    );

    const addConductorButton = screen.getByText('Add new Conductor');
    expect(addConductorButton).toBeInTheDocument();
  });

  test('navigates to /edtConductor when Add new Conductor button is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <ConductorsPresentation />
      </MemoryRouter>
    );

    const addConductorButton = screen.getByText('Add new Conductor');
    addConductorButton.click();

    // Assert that the URL has changed to /edtConductor
    expect(container.querySelector('a[href="/edtConductor/123"]')).toBeInTheDocument();
  });
});
