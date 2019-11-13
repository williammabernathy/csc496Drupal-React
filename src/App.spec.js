import React from 'react';
import renderer from 'react-test-renderer';
import App, { Recipe, RecipeFull, HomeHeading, Footer, Header, Loading } from './App';
import { Navbar, Nav } from 'react-bootstrap';
import { mount, shallow } from 'enzyme';
import { Button } from 'reactstrap';

/* App Component (Main) */
describe('App', () => 
{
    test('App snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Recipe Component */
describe('Recipe', () => 
{
    test('Recipe snapshot renders', () => {
        const component = renderer.create(<Recipe />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('view more button is clicked', () => {
        
    });
});

/* RecipeFull Component */
describe('RecipeFull', () => 
{
    test('Recipe Full snapshot renders', () => {
        const component = renderer.create(<RecipeFull />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // ID, title, field_images, field_ingredients, body, changeRecipe
    /*
    it('next button is clicked', () => {
        const wrapper = mount(<RecipeFull />)
        wrapper.find('.next').at(0).simulate('click');
        expect(wrapper.update().state().ID).toEqual(1);
    });

    it('previous button is clicked', () => {
        const mockPrevious = jest.fn();
        const button = shallow((<Button onClick={mockPrevious}></Button>))

        button.find('button').simulate('click');
        expect(mockPrevious.mock.calls.length).toEqual(1);
    });
    */
});

/* HomeHeading Component */
/* Coverage Complete */
describe('HomeHeading', () => 
{
    test('HomeHeading snapshot renders', () => {
        const component = renderer.create(<HomeHeading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Footer Component */
/* Coverage Complete */
describe('Footer', () => 
{
    test('Footer snapshot renders', () => {
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Header Component */
describe('Header', () => 
{
    const navComponent = shallow(<Header />);

    it('should contain 3 nav.links', () => {
        const items = navComponent.find(Nav.Link);
        expect(items).toHaveLength(3);
    });

    it('should contain 1 navbar.brand', () => {
        const items = navComponent.find(Navbar.Brand);
        expect(items).toHaveLength(1);
    });

    /*
    it('should render a pc MenuItem', () => {
        navComponent.find('.navBrand').simulate('click');
    });
    */

    test('Header snapshot renders', () => {
        const component = renderer.create(<Header />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Loading Component */
/* Coverage Complete */
describe('Loading', () => 
{
    test('Loading snapshot renders', () => {
        const component = renderer.create(<Loading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
