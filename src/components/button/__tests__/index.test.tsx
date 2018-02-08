import React, { Component } from 'react';
import { render, mount, configure } from 'enzyme';
import Button from '..';
import Icon from '../../icon';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Button>Follow</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(
      <Button>按钮</Button>
    );
    expect(wrapper).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper1 = render(
      <Button icon="search">按钮</Button>
    );
    expect(wrapper1).toMatchSnapshot();
    // should not insert space when there is icon
    const wrapper2 = render(
      <Button><Icon type="search" />按钮</Button>
    );
    expect(wrapper2).toMatchSnapshot();
  });

  it('have static perperty for type detecting', () => {
    const wrapper = mount(
      <Button>Button Text</Button>
    );
   
    expect(wrapper.type().__ANT_BUTTON).toBe(true);
  });

  it('should change loading state instantly by default', () => {
    class DefaultButton extends Component {
      state = {
        loading: false,
      };
      enterLoading = () => {
        this.setState({ loading: true });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.find('.ant-btn-loading').length).toBe(1);
  });

  it('should change loading state with delay', () => {
    // eslint-disable-next-line
    class DefaultButton extends Component {
      state = {
        loading: false,
      };
      enterLoading = () => {
        this.setState({ loading: { delay: 1000 } });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.hasClass('ant-btn-loading')).toBe(false);
  });

  it('should support link button', () => {
    const wrapper = mount(
      <Button target="_blank" href="http://ant.design">link button</Button>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('fixbug renders {0} , 0 and {false}', () => {
    const wrapper = render(
      <Button>{0}</Button>
    );
    expect(wrapper).toMatchSnapshot();
    const wrapper1 = render(
      <Button>0</Button>
    );
    expect(wrapper1).toMatchSnapshot();
    const wrapper2 = render(
      <Button>{false}</Button>
    );
    expect(wrapper2).toMatchSnapshot();
  });
});
