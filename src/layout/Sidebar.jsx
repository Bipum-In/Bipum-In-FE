import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryItem from '../components/layout/CategoryItem';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/routerConst';
import logo from '../styles/logo.svg';
import { ReactComponent as Add } from '../styles/sidebarIcon/add.svg';
import { ReactComponent as Dashboard } from '../styles/sidebarIcon/dashboard.svg';
import { ReactComponent as List } from '../styles/sidebarIcon/list.svg';
import { ReactComponent as Management } from '../styles/sidebarIcon/management.svg';

export default function Sidebar() {
  const navigate = useNavigate();

  const [active, setActive] = useState({
    dashboard: true,
    request: false,
    management: false,
    add: false,
  });

  const handleClickCategory = e => {
    const categoryName = e.target.innerText;
    console.log(categoryName);
    selectCategory(categoryName);
  };

  const selectCategory = categoryName => {
    const initCategory = {
      dashboard: false,
      request: false,
      management: false,
      add: false,
    };

    let path = '';

    switch (categoryName) {
      case '대시보드':
        setActive({ ...initCategory, dashboard: true });
        path = ROUTER.PATH.ADMIN_DASHBOARD;
        break;
      case '요청 현황':
        setActive({ ...initCategory, request: true });
        path = ROUTER.PATH.ADMIN_REQUEST_STATUS;
        break;
      case '비품 관리':
        setActive({ ...initCategory, management: true });
        path = ROUTER.PATH.MAIN;
        break;
      case '비품 등록':
        path = ROUTER.PATH.ADMIN_EQUIPMENT_ADD;
        setActive({ ...initCategory, add: true });
        break;
      default:
        return;
    }
    navigate(path);
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
            category={`${active.dashboard}`}
            title="대시보드"
          >
            <Dashboard />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${active.request}`}
            title="요청 현황"
          >
            <List />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${active.management}`}
            title="비품 관리"
          >
            <Management />
          </CategoryItem>
          <CategoryItem
            onClick={handleClickCategory}
            category={`${active.add}`}
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
  width: 100%;
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
