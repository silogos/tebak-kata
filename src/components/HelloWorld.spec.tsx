import { render, screen } from '@testing-library/react';
import { HelloWorld } from './HelloWorld';

it('render Hello World Components', () => {
  render(<HelloWorld />);
  const myElement = screen.getByText('Hello World')
  expect(myElement).toBeInTheDocument()
})