import React from 'react';
import { render, screen } from '@testing-library/react';
import {TodosContainer} from './App';

test('renders learn react link', () => {
  render(<TodosContainer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
