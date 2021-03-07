import Radio from './Radio.js';
import styled from 'styled-components';
import {colors} from '../consts/Colors.js';

const RadioBlock = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 18px;
  padding: 15px 15px 5px 15px;
  width: 160px;
  box-shadow: 2px 2px 8px ${colors['shadow']};
`;

const RadioTitle = styled.h2`
  font-size: 0.93rem;
  color: #5c6772;
  margin: 0;
  margin-bottom: 10px;
`;

export default function RadioList({radioType, radioOptions}) {
  return (
    <RadioBlock>
      <RadioTitle>{radioType}</RadioTitle>
      {radioOptions.map((option) => (
        <Radio
          radioType={radioType}
          name={option.name}
          checked={option.checked}
          id={option.id}
          key={option.id}
        />
      ))}
    </RadioBlock>
  );
}
