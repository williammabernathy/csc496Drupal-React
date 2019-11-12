import React from 'react';
import renderer from 'react-test-renderer';
import App, { Recipe } from './App';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

describe('App', () => 
{
    test('app snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('app renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    /*
    it('renders the inner Recipe Component', () => {
        const wrapper = mount(<App />);
        const recWrapper = wrapper.find(Recipe)
        expect(recWrapper.find('div').text()).toEqual(1);
    });
    */
});

/*
describe('Recipe', () => 
{
    it("recipe renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Recipe></Recipe>, div);
    });
});
*/

describe('My Test Suite', () => 
{
    it('My Test Case', () => 
    {
        expect(true).toEqual(true);
    });
});