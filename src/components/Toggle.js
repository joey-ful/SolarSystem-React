import React, {useCallback} from 'react';
import {useToggleDispatch} from '../contexts/ToggleContext.js';
import styled, {css} from 'styled-components';
import {Input} from './CustomizaztionMenu.js';
import {colors} from '../consts/Colors.js';

const ToggleLabel = styled.label`
  cursor: pointer;
`;

const Slider = styled.span`
  display: inline-block;
  position: relative;
  width: 28px;
  height: 12px;
  background-color: ${colors['default']};
  cursor: pointer;
  border-radius: 15px;
  top: 6px;
  &:before {
    display: inline-block;
    position: relative;
    content: '';
    height: 16px;
    width: 16px;
    bottom: 2px;
    background-color: white;
    transition: all 0.4s ease;
    border-radius: 50%;
    box-shadow: 2px 2px 8px ${colors['shadow']};
    ${(props) =>
      props.checkmark &&
      css`
        transform: translateX(14px);
      `};
  }
  ${(props) =>
    props.checkmark &&
    css`
      background-color: ${colors['checked']};
    `}
`;

const Text = styled.span`
  font-size: 0.9rem;
  position: relative;
  left: 10px;
  color: ${colors['default']};
  ${(props) =>
    props.checkmark &&
    css`
      color: ${colors['checked']};
    `}
`;

const List = styled.li`
  list-style: none;
  margin: 10px 0 5px 7px;
  &:hover {
    ${Slider} {
      background-color: ${colors['hovered']};
    }
    ${Text} {
      color: ${colors['hovered']};
    }
  }
`;

function Toggle({optionName, checked}) {
  const dispatch = useToggleDispatch();

  const onToggle = useCallback(() => {
    dispatch({
      type: 'TOGGLE',
      name: optionName,
    });
  }, dispatch, optionName);

  return (
    <List>
      <ToggleLabel htmlFor={optionName}>
        <Input
          type='checkbox'
          id={optionName}
          checked={checked}
          onChange={onToggle}
        ></Input>
        <Slider checkmark={checked}></Slider>
        <Text checkmark={checked}>{optionName}</Text>
      </ToggleLabel>
    </List>
  );
}

export default React.memo(Toggle);