import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function RequestMenu({ headerRef, menuStyle, onClickMenu }) {
  return (
    <RequestMenuContainer ref={headerRef}>
      <Button
        menuStyle={menuStyle[0].status}
        onClick={e => onClickMenu(e, e.target.innerText)}
      >
        {menuStyle[0].name}
      </Button>
      <Button
        menuStyle={menuStyle[1].status}
        onClick={e => onClickMenu(e, e.target.innerText)}
      >
        {menuStyle[1].name}
      </Button>
      <Button
        menuStyle={menuStyle[2].status}
        onClick={e => onClickMenu(e, e.target.innerText)}
      >
        {menuStyle[2].name}
      </Button>
      <Button
        menuStyle={menuStyle[3].status}
        onClick={e => onClickMenu(e, e.target.innerText)}
      >
        {menuStyle[3].name}
      </Button>
    </RequestMenuContainer>
  );
}

const RequestMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;
