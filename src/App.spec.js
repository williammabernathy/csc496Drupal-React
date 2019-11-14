import React from 'react';
import renderer from 'react-test-renderer';
import App, { Recipe, RecipeFull, HomeHeading, Footer, Header, Loading } from './App';
import { fetch, PATH_BASE, PATH_JSON, PARAM_TYPE, recURL, homeURL } from './constants/index.js'
import { Navbar, Nav } from 'react-bootstrap';
import { mount, shallow } from 'enzyme';

/* App Component (Main) */
describe('App', () => {
    const wrapper = shallow(<App />);
    var wrapperMount;// = mount(<App />);

    var mockRecipe = [
        {
            body: "body",
            field_images: "image",
            field_ingredients: "1 111",
            field_summary: "summary ",
            title: "title",
        },
        {
            body: "body",
            field_images: "image",
            field_ingredients: "1 1 1 1",
            field_summary: "summary ",
            title: "title ",
        }
    ]

    var mockHome = [
        {
            body: "body",
            title: "title",
        }
    ]

    test('App snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => {
        wrapperMount = mount(<App />);
    });

    it('renders Recipe on home page', () =>
    {
        wrapperMount.setState({ results: mockRecipe, homeHead: mockHome, page: "home" });
        //wrapper.instance().forceUpdate()
        expect(wrapperMount.find(Recipe).length).toEqual(2);
    });

    it('renders Recipe on recipe page', () =>
    {
        wrapperMount.setState({ results: mockRecipe, homeHead: mockHome, page: "recipes" });
        //wrapper.instance().forceUpdate()
        expect(wrapperMount.find(Recipe).length).toEqual(2);
    });

    it('renders RecipeFull', () =>
    {
        wrapperMount.setState({ results: mockRecipe, homeHead: mockHome, page: "recipeDetailed" });
        //wrapper.instance().forceUpdate()
        expect(wrapperMount.find(RecipeFull).length).toEqual(1);
    });

    it('renders Loading', () =>
    {
        expect(wrapperMount.find(Loading).length).toEqual(1);
    });

    it('renders Header', () =>
    {
        expect(wrapperMount.find(Header).length).toEqual(1);
    });

    it('renders Footer', () =>
    {
        expect(wrapperMount.find(Footer).length).toEqual(1);
    });

    it('renders HomeHeading', () =>
    {
        wrapperMount.setState({ results: mockRecipe, homeHead: mockHome });
        //wrapper.instance().forceUpdate()
        expect(wrapperMount.find(HomeHeading).length).toEqual(1);
    });

    it('tests a function viewRecipeClick', () =>
    {
        expect(wrapper.instance().viewRecipeClick()).toMatchSnapshot();
    });

    it('tests a function viewHome', () =>
    {
        expect(wrapper.instance().viewHome()).toMatchSnapshot();
    });

    it('tests a function viewRecipeNavClick', () =>
    {
        expect(wrapper.instance().viewRecipeNavClick()).toMatchSnapshot();
    });

    it('tests a function changeRecipe', () =>
    {
        expect(wrapper.instance().changeRecipe()).toMatchSnapshot();
    });
});

/* Recipe Component */
describe('Recipe', () => {
    test('Recipe snapshot renders', () => {
        const component = renderer.create(<Recipe />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('view more button is clicked', () => {
        // ...TODO
    });
});

/* RecipeFull Component */
describe('RecipeFull', () => {
    test('Recipe Full snapshot renders', () => {
        const component = renderer.create(<RecipeFull />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    // ID, title, field_images, field_ingredients, body, changeRecipe
    it('next button is clicked', () => {
        // ...TODO
    });

    it('previous button is clicked', () => {
        // ...TODO
    });
    
});

/* HomeHeading Component */
/* Coverage Complete */
describe('HomeHeading', () => {
    test('HomeHeading snapshot renders', () => {
        const component = renderer.create(<HomeHeading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Footer Component */
/* Coverage Complete */
describe('Footer', () => {
    test('Footer snapshot renders', () => {
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Header Component */
describe('Header', () => {
    const navComponent = shallow(<Header />);

    it('should contain 3 nav.links', () => {
        const items = navComponent.find(Nav.Link);
        expect(items).toHaveLength(3);
    });

    it('should contain 1 navbar.brand', () => {
        const items = navComponent.find(Navbar.Brand);
        expect(items).toHaveLength(1);
    });

    test('Header snapshot renders', () => {
        const component = renderer.create(<Header />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Loading Component */
/* Coverage Complete */
describe('Loading', () => {
    test('Loading snapshot renders', () => {
        const component = renderer.create(<Loading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
