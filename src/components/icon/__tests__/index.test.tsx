import React from 'react';
import { render, configure } from 'enzyme';
import Icon from "..";
import Adapter from 'enzyme-adapter-react-16';
import  renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });


describe('Icon', () => {
  it('should render to a <i class="xxx"></i>', () => {
    const wrapper = render(
      <Icon type="appstore" className="my-icon-classname" />
    );
    expect(wrapper).toMatchSnapshot();
});

  it('should render correctly', () => {
    const wrapper2 = renderer.create(<Icon type="appstore" className="my-icon-classname" />)
    .toJSON();
    expect(wrapper2).toMatchSnapshot();
  });
});