import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu() {
  return (
    <RequestMenuContainer>
      <Button reg>전체</Button>
      <Button>비품 요청</Button>
      <Button>반납 요청</Button>
      <Button>수리 요청</Button>
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  width: 100%;
`;
