import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Plus } from 'styles/commonIcon/plus.svg';
import Button from 'elements/Button';

export default function EquipmentAddBtn({
  onClickSingleModal,
  onClickMultiModal,
}) {
  return (
    <EquipmentAddConatiner>
      <Button onClick={onClickSingleModal}>
        <Plus />
        단일 등록
      </Button>
      <Button onClick={onClickMultiModal}>
        <Plus />
        복수 등록
      </Button>
    </EquipmentAddConatiner>
  );
}

const EquipmentAddConatiner = styled.div`
  display: flex;
  margin-right: 1rem;

  button:first-child {
    height: 2.125rem;
    color: white;
    background-color: ${props => props.theme.color.blue.brandColor5};
  }

  button:last-child {
    height: 2.125rem;
    color: white;
    background-color: #3aa471;
  }

  svg {
    width: 1.5rem;
  }
`;
