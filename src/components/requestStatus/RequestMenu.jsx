import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu({ menuStyle, onClickMenu }) {
  return (
    <RequestMenuContainer>
      <Button menuStyle={menuStyle[0].status} onClick={onClickMenu}>
        {menuStyle[0].name}
      </Button>
      <Button menuStyle={menuStyle[1].status} onClick={onClickMenu}>
        {menuStyle[1].name}
      </Button>
      <Button menuStyle={menuStyle[2].status} onClick={onClickMenu}>
        {menuStyle[2].name}
      </Button>
      <Button menuStyle={menuStyle[3].status} onClick={onClickMenu}>
        {menuStyle[3].name}
      </Button>
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem 0;

  button:first-child {
    margin-left: 0;
  }
  button:last-child {
    margin-right: 0;
  }
`;
