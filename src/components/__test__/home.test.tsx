import { render, cleanup, screen } from '@testing-library/react';
import Home from '../Home';

test('should render Home Component', () => {
    render(<Home />);
    const homeElement = screen.getByTestId('home-1');
    expect(homeElement).toBeInTheDocument();
})
