import { render, screen } from '@testing-library/react';
import Layout from './Layout';

it('render Layout', () => {
  render(<Layout>Hello World</Layout>);
  const myElement = screen.getByText('Hello World');
  expect(myElement).toBeInTheDocument();
});
