import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Home Page', () => {
  test('check text Add your Network', () => {
    const { getByText } = render(<App />);
    const title = getByText("Add your Network");
    expect(title).toBeInTheDocument();
  });
})

