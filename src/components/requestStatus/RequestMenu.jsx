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

  const handleClickMenu = e => {
    const menuName = e.target.innerText;
    switch (menuName) {
      case '전체':
        break;
      case '비품 요청':
        break;

      case '반납 요청':
        break;

      case '수리 요청':
        break;

      default:
        break;
    }
  };

  return (
    <RequestMenuContainer>
      <Button menuStyle={menuStyle.all} onClick={handleClickMenu}>
        전체
      </Button>
      <Button menuStyle={menuStyle.equipment} onClick={handleClickMenu}>
        비품 요청
      </Button>
      <Button menuStyle={menuStyle.return} onClick={handleClickMenu}>
        반납 요청
      </Button>
      <Button menuStyle={menuStyle.repair} onClick={handleClickMenu}>
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
