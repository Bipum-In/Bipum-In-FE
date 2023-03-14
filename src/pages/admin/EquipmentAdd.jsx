import React from 'react';
import styled from 'styled-components';
import EquipmentOneAdd from '../../components/equipmentAdd/EquipmentOneAdd';

export default function EquipmentAdd() {
  return (
    <EquipmentAddWrapper>
      <EquipmentOneAdd />
    </EquipmentAddWrapper>
  );
}

const EquipmentAddWrapper = styled.main`
  width: 100%;
  height: 100%;
`;
