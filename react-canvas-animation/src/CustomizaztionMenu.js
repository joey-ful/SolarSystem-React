import {useRadioState} from './contexts/RadioContext.js';
import {useToggleState} from './contexts/ToggleContext.js';
import Toggle from './Toggle.js';
import RadioList from './RadioList.js';
import styled from 'styled-components';
import {colors} from './Colors.js';

const CustomizationMenuBlock = styled.div`
  position: absolute;
  top: 30px;
  right: 15px;
  padding: 0;
  margin: 0;
  padding: 15px;
  background-color: ${colors['menu']};
  border-radius: 8px;
  box-shadow: 4px 4px 12px ${colors['dark-shadow']};
`;

const MenuTitle = styled.h1`
  color: ${colors['menu-title']};
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 25px;
  margin-left: 3px;
`;

const Separator = styled.div`
  position: absolute;
  width: 220px;
  height: 1px;
  background-color: ${colors['light-grey']};
  top: 45px;
  right: 0px;
  padding: 0;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  cursor: pointer;
`;

export default function CustomizationMenu() {
  const radioOptions = useRadioState();
  const toggleOptions = useToggleState();
  
  return (
    <CustomizationMenuBlock>
      <MenuTitle>Animation Effects</MenuTitle>
      <Separator />
      {radioOptions.map((radio) => (
        <RadioList
          radioType={radio.type}
          radioOptions={radio.options}
          key={radio.id}
        />
      ))}
      {toggleOptions.map((toggle) => (
        <Toggle
          optionName={toggle.name}
          checked={toggle.checked}
          key={toggle.id}
        />
      ))}
    </CustomizationMenuBlock>
  );
}
