import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Hangman from './Hangman';

describe('<Hangman>', () => {
  it('renders without crashing', () => {
    shallow(<Hangman />);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Hangman />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
  });

  it('should change image to img1 after first incorrect guess of "b"', () => {
    const wrapper = shallow(<Hangman />);
    wrapper
      .find('button[value="b"]')
      .simulate('click', { target: { value: 'b' } });
    const serialzed = toJson(wrapper);
    const imgSrc = serialzed.children[0].props;
    expect(imgSrc).toEqual({ src: '1.jpg' });
  });

  // check if it is possible to check for expect equality within serialized itself.
  it('should change revealed letters but keep the same image with correct guess of "a"', () => {
    const wrapper = shallow(<Hangman />);
    wrapper
      .find('button[value="a"]')
      .simulate('click', { target: { value: 'a' } });
    const serialized = toJson(wrapper);
    const imgSrc = serialized.children[0].props;
    console.log(serialized.children[1].children);
    const letters = serialized.children[1].children;
    expect(imgSrc).toEqual({ src: '0.jpg' });
    expect(letters).toContain('a');
  });
});
