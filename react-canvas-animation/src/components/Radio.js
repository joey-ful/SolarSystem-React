import {Input} from './CustomizaztionMenu.js';
import {useRadioDispatch} from '../contexts/RadioContext.js';
import styled, {css} from 'styled-components';
import {colors} from '../consts/Colors.js';

const RadioLabel = styled.label`
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  margin: 5px 0 5px 0;
`;

const RadioCheck = styled.span`
  position: absolute;
  height: 13px;
  width: 13px;
  border: 2px solid ${colors['default']};
  border-radius: 50%;
  &:after {
    content: '';
    position: absolute;
    display: none;
    top: 2px;
    left: 2px;
    width: 9px;
    height: 9px;
    background-color: ${colors['checked']};
    border-radius: 50%;
    ${(props) =>
      props.checkmark &&
      css`
        display: block;
      `}
  }
  ${(props) =>
    props.checkmark &&
    css`
      border-color: ${colors['checked']};
    `}
`;

const Text = styled.span`
  font-size: 0.9rem;
  position: relative;
  bottom: 1px;
  left: 28px;
  color: ${colors['default']};
  ${(props) =>
    props.checkmark &&
    css`
      color: ${colors['checked']};
    `}
`;

const List = styled.li`
  list-style: none;
  &:hover {
    ${RadioCheck} {
      border-color: ${colors['hovered']};
    }
    ${Text} {
      color: ${colors['hovered']};
    }
  }
`;

export default function Radio({radioType, name, checked, id}) {
  const dispatch = useRadioDispatch();

  const onChange = () => {
    dispatch({
      type: 'CLICK',
      radioType,
      name,
      id,
    });
  };

  return (
    <List>
      <RadioLabel htmlFor={name}>
        <Input
          type='radio'
          id={name}
          checked={checked}
          name={radioType}
          onChange={onChange}
        ></Input>

        <RadioCheck checkmark={checked}></RadioCheck>

        <Text checkmark={checked}>{name}</Text>
      </RadioLabel>
    </List>
  );
}
