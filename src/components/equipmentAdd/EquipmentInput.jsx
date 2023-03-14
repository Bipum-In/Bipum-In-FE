import React from 'react';
import styled from 'styled-components';

export default function EquipmentInput() {
  return (
    <InputContainer>
      <InputHeader></InputHeader>
    </InputContainer>
  );
}

const InputContainer = styled.section`
  width: 100%;
  height: 100px;
`;

const InputHeader = styled.section`
  width: 100%;
  height: 40px;
`;
