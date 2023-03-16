import React from 'react';
import styled from 'styled-components';
import CategoryItem from '../components/layout/CategoryItem';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/routerConst';
import logo from '../styles/logo.svg';
import { ReactComponent as Add } from '../styles/sidebarIcon/add.svg';
import { ReactComponent as Dashboard } from '../styles/sidebarIcon/dashboard.svg';
import { ReactComponent as List } from '../styles/sidebarIcon/list.svg';
import { ReactComponent as Management } from '../styles/sidebarIcon/management.svg';
import useSelectMenu from '../hooks/useSelectMenu';

export default function Sidebar() {
  const navigate = useNavigate();
  const [menuStyle, handleClickMenu] = useSelectMenu(
    [
      { name: '대시보드', status: true },
      { name: '요청 현황', status: false },
      { name: '비품 관리', status: false },
      { name: '비품 등록', status: false },
    ],
    'sideBarMenu'
  );

  const handleClickCategory = e => {
    const name = e.target.innerText;
    handleClickMenu(e);
    name === '대시보드' && navigate(ROUTER.PATH.ADMIN_DASHBOARD);
    name === '요청 현황' && navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
    name === '비품 관리' && navigate(ROUTER.PATH.MAIN);
    name === '비품 등록' && navigate(ROUTER.PATH.ADMIN_EQUIPMENT_ADD);
  };

  return (
    <>
      <SidebarWrapper>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <SidebarCategoryContainer>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${menuStyle[0].status}`}
            title="대시보드"
          >
            <Dashboard />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${menuStyle[1].status}`}
            title="요청 현황"
          >
            <List />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${menuStyle[2].status}`}
            title="비품 관리"
          >
            <Management />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${menuStyle[3].status}`}
            title="비품 등록"
          >
            <Add />
          </CategoryItem>
        </SidebarCategoryContainer>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.aside`
  position: relative;
  min-width: 15.625rem;
  max-width: 15.625rem;
  height: 100%;
  background-color: white;
  box-shadow: -0.3125rem 0 1.5625rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 0 2.5rem 2.5rem 0;
  z-index: 1;
`;

const LogoContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  padding-top: 2.625rem;
`;

const Logo = styled.div`
  width: 5.375rem;
  height: 2.3125rem;
  background: url(${logo}) no-repeat center center / cover;
`;

const SidebarCategoryContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 6.4375rem;
  margin: 5.9375rem auto;
`;
