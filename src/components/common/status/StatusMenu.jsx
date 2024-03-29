import React from 'react';
import styled from 'styled-components';
import Button from 'elements/Button';

export default function StatusMenu({ menuStyle, onClickMenu, children }) {
  return (
    <StatusMenuContainer>
      {menuStyle.map(menu => (
        <Button
          key={menu.name}
          menuStyle={menu.status}
          onClick={e => onClickMenu(e, e.target.innerText)}
        >
          {children}
          {menu.name}
        </Button>
      ))}
    </StatusMenuContainer>
  );
}

const StatusMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;
