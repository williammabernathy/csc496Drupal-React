import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import { mount } from 'enzyme';

describe('App', () => 
{
    test('snapshot renders', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    /*
    it('renders the inner Recipe Component', () => {
        const wrapper = mount(<App />);
        const recWrapper = wrapper.find(Recipe)
        expect(recWrapper.find('div').text()).toEqual(1);
    });
    */
});

describe('My Test Suite', () => 
{
    it('My Test Case', () => 
    {
        expect(true).toEqual(true);
    });
});