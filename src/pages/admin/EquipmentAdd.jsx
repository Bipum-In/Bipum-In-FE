import React, { useState } from 'react';
import styled from 'styled-components';
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
            <h1>단일 등록</h1>
          </>
        )}
        {activeComponent === STRING.ADDMENUE.ADDMULTIPLE && (
          <>
            <h1>복수 등록</h1>
          </>
        )}
      </AddComponentsContainer>
    </EquipmentWrapper>
  );
}

const EquipmentWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.wh100};
  padding: 3.125rem;
`;

const AddBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
  gap: 0.5375rem;
  padding-bottom: 1.4375rem;
`;
const AddComponentsContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  border: 0.0579rem solid ${props => props.theme.color.grey.brandColor2};
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
