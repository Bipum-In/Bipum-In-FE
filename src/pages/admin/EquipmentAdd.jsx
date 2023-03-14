import React from 'react';
import styled from 'styled-components';
import EquipmentInput from '../../components/equipmentAdd/EquipmentInput';

export default function EquipmentAdd() {
  return (
    <EquipmentAddWrapper>
      <EquipmentInput />
    </EquipmentAddWrapper>
  );
}

const EquipmentAddWrapper = styled.main`
  width: 100%;
  height: 100%;
`;
