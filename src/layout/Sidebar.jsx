import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  CategoryItemLeft,
  CategoryItemRight,
} from 'components/layout/CategoryItem';

import { ReactComponent as Logo } from 'styles/logo.svg';

import { ReactComponent as Eye } from 'styles/sidebarIcon/eye.svg';
import { ReactComponent as Add } from 'styles/sidebarIcon/add.svg';
import { ReactComponent as Dashboard } from 'styles/sidebarIcon/dashboard.svg';
import { ReactComponent as List } from 'styles/sidebarIcon/list.svg';
import { ReactComponent as Management } from 'styles/sidebarIcon/management.svg';

import { ReactComponent as Setting } from 'styles/headerIcon/setting.svg';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';

import ROUTER from 'constants/routerConst';
import STRING from 'constants/string';
import ARRAY from 'constants/array';
import useOutsideClick from 'hooks/useOutsideClick';
import { getEncryptionStorage } from '../utils/encryptionStorage';

export default function Sidebar({
  isSidebarHidden,
  setIsSidebarHidden,
  isMobileView,
}) {
  const { isAdmin } = getEncryptionStorage();
  const isAdminStr = STRING.IS_ADMIN(isAdmin);

  const navigate = useNavigate();
  const theme = useTheme();
  const categoryIcons = isAdmin
    ? [<Dashboard />, <List />, <Management />, <Add />]
    : [<Dashboard />, <Add />, <List />, <Eye />];

  const { pathname } = useLocation();

  const handleClickCategory = e => {
    const name = e.target.innerText;
    const routerPathArray = Object.values(ROUTER.PATH[isAdminStr]);
    Object.values(STRING.SIDEBAR[isAdminStr]).forEach((sidebarName, index) => {
      if (sidebarName === name) {
        navigate(routerPathArray[index]);
      }
    });
  };

  const dropDownRef = useRef(null);

  const desktopSize = window.innerWidth <= theme.screen.desktopSize;
  useOutsideClick(
    dropDownRef,
    () => {
      setIsSidebarHidden(true);
    },
    desktopSize
  );

  const handleSidebarToggle = () => setIsSidebarHidden(prev => !prev);

  const handleLogoClick = () => {
    if (desktopSize) {
      setIsSidebarHidden(true);
    }
    const targetPath = isAdmin
      ? ROUTER.PATH.ADMIN.DASHBOARD
      : ROUTER.PATH.USER.DASHBOARD;
    navigate(targetPath);
  };

  return (
    <>
      <SidebarWrapper isHidden={isSidebarHidden} ref={dropDownRef}>
        {isMobileView && <ArrowDownIcon onClick={handleSidebarToggle} />}
        <LogoContainer onClick={handleLogoClick}>
          <Logo />
        </LogoContainer>
        <SidebarCategoryContainer>
          {Object.values(STRING.SIDEBAR[isAdminStr]).map(
            (sidebarName, index) => (
              <CategoryItemLeft
                key={uuidv4()}
                onClick={handleClickCategory}
                category={`${
                  ARRAY.SIDEBAR.SIDEBAR_STYLE(pathname, isAdmin)[index]
                }`}
                title={sidebarName}
              >
                {categoryIcons[index]}
              </CategoryItemLeft>
            )
          )}
          {isAdmin && (
            <LogoutContainer>
              <CategoryItemRight
                onClick={() => navigate(ROUTER.PATH.ADMIN.MANAGEMENT)}
                title="관리자 설정"
              >
                <Setting />
              </CategoryItemRight>
            </LogoutContainer>
          )}
        </SidebarCategoryContainer>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.aside`
  ${props => props.theme.FlexCol};
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 12.5rem;
  width: 12.5rem;
  height: 100%;
  background-color: white;
  box-shadow: -0.3125rem 0 1.5625rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 0 2.5rem 2.5rem 0;
  z-index: 1000;
  transform: ${({ isHidden }) => (isHidden ? 'translateX(-100%)' : 'none')};
  transition: transform 0.3s ease-in-out;
`;

const LogoContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  height: 6.25rem;
  width: 100%;
  margin: 1.875rem 0;
  ${props => props.theme.CursorActive};
  svg {
    width: 70%;
  }
`;

const SidebarCategoryContainer = styled.div`
  ${props => props.theme.FlexCol};
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  gap: 0.9375rem;
`;

const LogoutContainer = styled.div`
  ${props => props.theme.FlexRow}
  width: 100%;
  margin-top: auto;
  margin-bottom: 3.625rem;
`;

const ArrowDownIcon = styled(ArrowDown)`
  position: absolute;
`;
