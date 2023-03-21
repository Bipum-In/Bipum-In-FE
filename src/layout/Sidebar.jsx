import React from 'react';
import styled from 'styled-components';
import {
  CategoryItemLeft,
  CategoryItemRight,
} from '../components/layout/CategoryItem';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/routerConst';
import logo from '../styles/logo.svg';
import { ReactComponent as Add } from '../styles/sidebarIcon/add.svg';
import { ReactComponent as Dashboard } from '../styles/sidebarIcon/dashboard.svg';
import { ReactComponent as List } from '../styles/sidebarIcon/list.svg';
import { ReactComponent as Management } from '../styles/sidebarIcon/management.svg';
import { ReactComponent as Logout } from '../styles/sidebarIcon/logout.svg';
import useSelectMenu from '../hooks/useSelectMenu';
import STRING from '../constants/string';
import { removeCookie } from '../utils/cookie';
import QUERY from '../constants/query';
import Storage from '../utils/localStorage';
import { CustomModal } from '../elements/Modal';
import { useModalState } from '../hooks/useModalState';

export default function Sidebar() {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useModalState();

  const [menuStyle, handleClickMenu] = useSelectMenu(
    [
      { name: STRING.SIDEBAR.DASHBOARD, status: true },
      { name: STRING.SIDEBAR.REQUEST_STATUS, status: false },
      { name: STRING.SIDEBAR.MANAGEMENT, status: false },
      { name: STRING.SIDEBAR.EQUIPMENT_ADD, status: false },
    ],
    'sideBarMenu'
  );

  const handleClickCategory = e => {
    const name = e.target.innerText;
    handleClickMenu(e);
    name === STRING.SIDEBAR.DASHBOARD && navigate(ROUTER.PATH.ADMIN_DASHBOARD);
    name === STRING.SIDEBAR.REQUEST_STATUS &&
      navigate(ROUTER.PATH.ADMIN_REQUEST_STATUS);
    name === STRING.SIDEBAR.MANAGEMENT &&
      navigate(ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT);
    name === STRING.SIDEBAR.EQUIPMENT_ADD &&
      navigate(ROUTER.PATH.ADMIN_EQUIPMENT_ADD);
  };

  const cleanTokenNStorage = () => {
    navigate('/');
    setLogoutModal(true);
    Storage.clearLocalStorage();
  };

  const handleLogoutBtn = () =>
    removeCookie(QUERY.COOKIE.COOKIE_NAME, cleanTokenNStorage());

  const handleModalShow = () => setLogoutModal();
  const handleModalClose = () => setLogoutModal(false);

  return (
    <>
      <SidebarWrapper>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <SidebarCategoryContainer>
          <CategoryItemLeft
            onClick={handleClickCategory}
            category={`${menuStyle[0].status}`}
            title={STRING.SIDEBAR.DASHBOARD}
          >
            <Dashboard />
          </CategoryItemLeft>
          <CategoryItemLeft
            onClick={handleClickCategory}
            category={`${menuStyle[1].status}`}
            title={STRING.SIDEBAR.REQUEST_STATUS}
          >
            <List />
          </CategoryItemLeft>
          <CategoryItemLeft
            onClick={handleClickCategory}
            category={`${menuStyle[2].status}`}
            title={STRING.SIDEBAR.MANAGEMENT}
          >
            <Management />
          </CategoryItemLeft>
          <CategoryItemLeft
            onClick={handleClickCategory}
            category={`${menuStyle[3].status}`}
            title={STRING.SIDEBAR.EQUIPMENT_ADD}
          >
            <Add />
          </CategoryItemLeft>
          <LogoutContainer>
            <CategoryItemRight onClick={handleModalShow} title="로그아웃">
              <Logout />
            </CategoryItemRight>
            <CustomModal
              isOpen={logoutModal}
              onClose={handleModalClose}
              submit={handleLogoutBtn}
              text={'로그아웃'}
            >
              정말 로그아웃 하시겠습니까?
            </CustomModal>
          </LogoutContainer>
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
  height: 6.25rem;
  width: 100%;
  margin: 1.875rem 0;
`;

const Logo = styled.div`
  min-width: 7.25rem;
  height: 1.9375rem;
  background: url(${logo}) no-repeat;
`;

const SidebarCategoryContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
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
