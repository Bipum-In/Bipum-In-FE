import React, { useState } from 'react';
import styled from 'styled-components';
import AddSingleItem from '../../components/equipmentAdd/AddSingleItem';
import Button from '../../elements/Button';
import useSelectMenu from '../../hooks/useSelectMenu';
import STRING from '../../constants/string';

export default function EquipmentAdd() {
  const [menuStyle, handleClickMenu] = useSelectMenu(
    [
      { name: STRING.ADDMENUE.ADDBIPUM, status: true },
      { name: STRING.ADDMENUE.ADDMULTIPLE, status: false },
    ],
    'addEquipment'
  );

  const [activeComponent, setActiveComponent] = useState(menuStyle[0].name);
  const handleClickAddEquipment = e => {
    const name = e.target.innerText;
    handleClickMenu(e);
    setActiveComponent(name);
  };

  return (
    <EquipmentWrapper>
      <AddBtnContainer>
        <Button
          onClick={handleClickAddEquipment}
          menuStyle={menuStyle[0].status}
        >
          {STRING.ADDMENUE.ADDBIPUM}
        </Button>
        <Button
          onClick={handleClickAddEquipment}
          menuStyle={menuStyle[1].status}
        >
          {STRING.ADDMENUE.ADDMULTIPLE}
        </Button>
      </AddBtnContainer>

      <AddComponentsContainer>
        {activeComponent === STRING.ADDMENUE.ADDBIPUM && (
          <>
            <AddSingleItem>단일 등록</AddSingleItem>
          </>
        )}
        {activeComponent === STRING.ADDMENUE.ADDMULTIPLE && (
          <>
            <div>복수 등록</div>
          </>
        )}
      </AddComponentsContainer>
    </EquipmentWrapper>
  );
}
const EquipmentWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.wh100};
`;
const AddBtnContainer = styled.div`
  ${props => props.theme.FlexRow};

  justify-content: flex-start;
  gap: 0.5375rem;
`;
const AddComponentsContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
