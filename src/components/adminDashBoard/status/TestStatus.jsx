import React from 'react';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';

export default function TestStatus() {
  return (
    <>
      <styleds.EquipmentTopContainer>
        <AnchorBtn onClick={() => {}}>추가기능</AnchorBtn>
        <styleds.AlertAndAddContainer></styleds.AlertAndAddContainer>
      </styleds.EquipmentTopContainer>
    </>
  );
}
