import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { CategoryItemLeft } from 'components/layout/CategoryItem';

import Logo from 'components/layout/Logo';

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
    if (!name) {
      const targetPath = isAdmin
        ? ROUTER.PATH.ADMIN.DASHBOARD
        : ROUTER.PATH.USER.DASHBOARD;
      navigate(targetPath);
    }
    const routerPathArray = Object.values(ROUTER.PATH[isAdminStr]);
    const index = Object.values(STRING.SIDEBAR[isAdminStr]).findIndex(
      sidebarName => sidebarName === name
    );
    if (index >= 0) {
      navigate(routerPathArray[index]);
    }
    if (desktopSize) {
      setIsSidebarHidden(true);
    }
  };

  const desktopSize = window.innerWidth <= theme.screen.desktopSize;

  const dropDownRef = useOutsideClick(() => {
    setIsSidebarHidden(true);
  }, desktopSize);
  return (
    <>
      <SidebarWrapper isHidden={isSidebarHidden} ref={dropDownRef}>
        {isMobileView && <ArrowDownIcon onClick={handleClickCategory} />}
        <LogoContainer onClick={handleClickCategory}>
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
            <ManageManetContainer onClick={handleClickCategory}>
              <CategoryItemLeft
                category={`${
                  ARRAY.SIDEBAR.SIDEBAR_STYLE(pathname, isAdmin)[4]
                }`}
                onClick={() => navigate(ROUTER.PATH.ADMIN.MANAGEMENT)}
                title={STRING.HEADER_DROPDOWN.SETTINGS}
              >
                <Setting />
              </CategoryItemLeft>
            </ManageManetContainer>
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

const ManageManetContainer = styled.div`
  ${props => props.theme.FlexRow}
  width: 100%;
  margin-top: auto;
  margin-bottom: 3.625rem;
`;

const ArrowDownIcon = styled(ArrowDown)`
  position: absolute;
`;
