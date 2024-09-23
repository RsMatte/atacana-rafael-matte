import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../../../../src/app/search/components/Header';

describe('Header component', () => {
  it('should render the header correctly', async () => {
    render(<Header />);

    const headerComponent = screen.getByTestId('main-header');

    expect(headerComponent).toBeInTheDocument();
  });
});
