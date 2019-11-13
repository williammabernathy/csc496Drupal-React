import React from 'react';
import renderer from 'react-test-renderer';
import App, { Recipe, RecipeFull, HomeHeading, Footer, Header, Loading } from './App';
import { mount, shallow } from 'enzyme';
import { Button } from 'reactstrap';

describe('App', () => 
{
    test('App snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Recipe', () => 
{
    test('Recipe snapshot renders', () => {
        const component = renderer.create(<Recipe />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('view more button is clicked', () => {
        const mockView = jest.fn();
        const button = shallow((<Button onClick={mockView}></Button>))

        button.find('button').simulate('click');
        expect(mockView.mock.calls.length).toEqual(1);
    });
});

describe('RecipeFull', () => 
{
    test('Recipe Full snapshot renders', () => {
        const component = renderer.create(<RecipeFull />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // ID, title, field_images, field_ingredients, body, changeRecipe
    it('next button is clicked', () => {
        const mockNext = jest.fn();
        const button = shallow((<Button onClick={mockNext}></Button>))

        button.find('button').simulate('click');
        expect(mockNext.mock.calls.length).toEqual(1);
    });

    it('previous button is clicked', () => {
        const mockPrevious = jest.fn();
        const button = shallow((<Button onClick={mockPrevious}></Button>))

        button.find('button').simulate('click');
        expect(mockPrevious.mock.calls.length).toEqual(1);
    });
});

describe('HomeHeading', () => 
{
    test('HomeHeading snapshot renders', () => {
        const component = renderer.create(<HomeHeading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Footer', () => 
{
    test('Footer snapshot renders', () => {
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Header', () => 
{
    test('Header snapshot renders', () => {
        const component = renderer.create(<Header />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Loading', () => 
{
    test('Loading snapshot renders', () => {
        const component = renderer.create(<Loading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('My Test Suite', () => 
{
    it('My Test Case', () => 
    {
        expect(true).toEqual(true);
    });
});