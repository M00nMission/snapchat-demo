import React from 'react';
import { shallow, mount } from 'enzyme';
import Icon from 'common/Icon';
import Button from 'common/Button';
import PodActionItem from './index';

const defaultProps = {
  leftIcon: 'faCamera',
  rightIcon: 'faEllipsisV',
  label: 'Add to My Story'
};

describe('<PodActionItem />', () => {
  it('renders without crashing', () => {
    const component = shallow(<PodActionItem {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has text', () => {
    const component = mount(<PodActionItem {...defaultProps} />);
    expect(component.text()).toBe(defaultProps.label);
  });

  it('has left and right icons', () => {
    const component = shallow(<PodActionItem {...defaultProps} />);
    expect(component.find(Icon).prop('icon')).toBe(defaultProps.leftIcon);
    expect(component.find(Button).prop('icon')).toBe(defaultProps.rightIcon);
  });
});
