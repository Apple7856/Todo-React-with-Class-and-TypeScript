import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../Home';


describe('Home page testing', () => {

    test("test", () => {
        expect(true).toBe(true);
    });

    test('heading Testing', () => {
        const component = render(<Home />);
        const heading = component.getByTestId('heading');
        expect(heading.textContent).toBe("Create Todo");
    })

    test('Button Testing', () => {
        const component = render(<Home />);
        const button = component.getByTestId('button');
        expect(button.textContent).toBe('Add Todo');
    })

    test('snapShot testing', () => {
        const component = render(<Home />);
        expect(component).toMatchSnapshot();
    })
})

