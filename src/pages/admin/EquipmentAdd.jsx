import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';
import useSelectMenu from '../../hooks/useSelectMenu';

export default function EquipmentAdd() {
  const MENUETITLE = {
    ADDBIPUM: '비품 등록',
    ADDEXCEL: '엑셀로 전체 등록',
  };

  const [menuStyle, handleClickMenu] = useSelectMenu(
    [
      { name: MENUETITLE.ADDBIPUM, status: true },
      { name: MENUETITLE.ADDEXCEL, status: false },
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
          {MENUETITLE.ADDBIPUM}
        </Button>
        <Button
          onClick={handleClickAddEquipment}
          menuStyle={menuStyle[1].status}
        >
          {MENUETITLE.ADDEXCEL}
        </Button>
      </AddBtnContainer>

      <AddComponentsContainer>
        {activeComponent === MENUETITLE.ADDBIPUM && (
          <>
            <h1>단일 등록</h1>
          </>
        )}
        {activeComponent === MENUETITLE.ADDEXCEL && (
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
