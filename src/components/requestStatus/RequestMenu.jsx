import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu() {
  const [menuStyle, setMenuClick] = useState({
    all: true,
    equipment: false,
    return: false,
    repair: false,
  });

  return (
    <RequestMenuContainer>
      <Button menuStyle={menuStyle.all}>전체</Button>
      <Button menuStyle={menuStyle.equipment}>비품 요청</Button>
      <Button menuStyle={menuStyle.return}>반납 요청</Button>
      <Button menuStyle={menuStyle.repair}>수리 요청</Button>
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2.25rem 0 1.5rem 3.25rem;
`;
