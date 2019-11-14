import React from 'react';
import renderer from 'react-test-renderer';
import App, { Recipe, RecipeFull, HomeHeading, Footer, Header, Loading, } from './App';
import { Navbar, Nav} from 'react-bootstrap';
import { mount, shallow } from 'enzyme';

/* App Component (Main) */
describe('App', () => {
    const wrapper = shallow(<App />);
    var wrapperMount;

    //mock data to mimic results in App component
    var mockRecipe = [
        {
            body: "body",
            field_images: "image",
            field_ingredients: "1 111",
            field_summary: "summary",
            title: "title",
        },
        {
            body: "body",
            field_images: "image",
            field_ingredients: "1 1 1 1",
            field_summary: "summary",
            title: "title ",
        }
    ]

    //mock data to mimic home page results
    var mockHome = [
        {
            body: "body",
            title: "title",
        }
    ]

    //simple test to check if the component renders via snapshot
    test('App snapshot renders', () => 
    {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //before each tests, mount the app component
    //not all tests will use mount, some will use shallow
    beforeEach(() => 
    {
        wrapperMount = mount(<App />);
    });

    //check that components inside App render
    //also check multiple pages
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

    it('renders RecipeFull current at 1', () =>
    {
        wrapperMount.setState({ results: mockRecipe, currentRecipe: 1, homeHead: mockHome, page: "recipeDetailed" });
        //wrapper.instance().forceUpdate()
        expect(wrapperMount.find(RecipeFull).length).toEqual(1);
    });

    it('renders Loading', ()  =>
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

    //simple function render checks
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

    //check changeRecipe function when the passed value meets
    //its upper and lower limits
    it('test function changeRecipe when ID === -1', () =>
    {
        wrapper.setState({ results: mockRecipe, currentRecipe: 0 });
        wrapper.update();
        expect(wrapper.instance().changeRecipe(-1)).toEqual(mockRecipe.length - 1);
    });

    it('test function changeRecipe when ID === results.length', () =>
    {
        wrapper.setState({ results: mockRecipe, currentRecipe: mockRecipe.length - 1 });
        wrapper.update();
        expect(wrapper.instance().changeRecipe(mockRecipe.length)).toEqual(0);
    });

    //failsafe to close any asynchronous tasks
    afterAll(done => 
    {
        done()
    })
});

/* Recipe Component */
describe('Recipe', () => 
{
    let wrapper;    //shallow Recipe wrapper
    const setState = jest.fn();     //mock functions
    const useStateSpy = jest.spyOn(React, 'useState')       //state spy
    useStateSpy.mockImplementation((init) => [init, setState]);     //mimic state change

    //fill shallow component with mock data
    beforeEach(() => {
        wrapper = shallow(<Recipe
            ID={1}
            title={'title'}
            field_images={'field_images'}
            field_ingredients={'field_ingredients'}
            body={'body'}
            viewRecipeClick={setState}
        />);
    });

    //renders via snapshot
    test('Recipe snapshot renders', () => 
    {
        const component = renderer.create(<Recipe />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //check that the button to view a recipe's details is clicked
    //and that it returns correct values
    it('view more button is clicked', () => 
    {
        wrapper.find('#full').props().onClick();
        expect(setState).toHaveBeenCalledWith(1);
    });
});

/* RecipeFull Component */
describe('RecipeFull', () => 
{
    //mock setup
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    //populate component with mockdata
    beforeEach(() => {
        wrapper = shallow(<RecipeFull
            ID={1}
            title={'title'}
            field_images={'field_images'}
            field_ingredients={'field_ingredients'}
            body={'body'}
            changeRecipe={setState}
        />);
    });

    //clear mock data after each tests
    afterEach(() => {
        jest.clearAllMocks();
    });

    //test component renders via snapshot
    test('Recipe Full snapshot renders', () => 
    {
        const component = renderer.create(<RecipeFull />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //check button clicks for previous and next recipe views
    //ensure the value in state is changed correctly
    // ID, title, field_images, field_ingredients, body, changeRecipe
    it('next button is clicked', () => 
    {
        wrapper.find('#next').props().onClick();
        expect(setState).toHaveBeenCalledWith(2);
    });

    it('previous button is clicked', () => 
    {
        wrapper.find('#previous').props().onClick();
        expect(setState).toHaveBeenCalledWith(0);
    });
    
});

/* HomeHeading Component */
/* Coverage Complete */
describe('HomeHeading', () => 
{
    test('HomeHeading snapshot renders', () => 
    {
        const component = renderer.create(<HomeHeading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Footer Component */
/* Coverage Complete */
describe('Footer', () => 
{
    test('Footer snapshot renders', () => 
    {
        const component = renderer.create(<Footer />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

/* Header Component */
describe('Header', () => 
{
    let navComponent;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    //fill component with mock data
    beforeEach(() => {
        navComponent = shallow(<Header
            viewHome={setState}
            viewRecipeNavClick={setState}
        />);
    });

    //check that it renders via snapshot
    test('Header snapshot renders', () => 
    {
        const component = renderer.create(<Header />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //check for all nav.links
    it('should contain 3 nav.links', () => 
    {
        const items = navComponent.find(Nav.Link);
        expect(items).toHaveLength(3);
    });

    //check that clicking the home nav.link returns an empty call
    it('viewHome link is clicked', () => 
    {
        navComponent.find('#viewHome').props().onClick();
        expect(setState).toHaveBeenCalledWith();
    });

    //check that clicking the recipe list nav.link returns an empty call
    it('viewRecList link is clicked', () => 
    {
        navComponent.find('#viewRecList').props().onClick();
        expect(setState).toHaveBeenCalledWith();
    });

    //check that one navbar.brand renders
    it('should contain 1 navbar.brand', () => 
    {
        const items = navComponent.find(Navbar.Brand);
        expect(items).toHaveLength(1);
    });

    //check that clicking the home nav.link returns an empty call
    it('brand link is clicked', () => 
    {
        navComponent.find('#brand').props().onClick();
        expect(setState).toHaveBeenCalledWith();
    });
});

/* Loading Component */
/* Coverage Complete */
describe('Loading', () => 
{
    test('Loading snapshot renders', () => 
    {
        const component = renderer.create(<Loading />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
