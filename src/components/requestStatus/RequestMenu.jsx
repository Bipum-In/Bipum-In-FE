import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu({ menuStyle, onClickMenu }) {
  return (
    <RequestMenuContainer>
      <Button menuStyle={menuStyle.all} onClick={onClickMenu}>
        전체
      </Button>
      <Button menuStyle={menuStyle.equipment} onClick={onClickMenu}>
        비품 요청
      </Button>
      <Button menuStyle={menuStyle.return} onClick={onClickMenu}>
        반납 요청
      </Button>
      <Button menuStyle={menuStyle.repair} onClick={onClickMenu}>
        수리 요청
      </Button>
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2.25rem 0 1.5rem 3.25rem;
`;
