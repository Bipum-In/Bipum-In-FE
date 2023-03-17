import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu({
  headerRef,
  menuStyle,
  onClickMenu,
  children,
}) {
  return (
    <RequestMenuContainer ref={headerRef}>
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
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;
