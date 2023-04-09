import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styled, { useTheme, keyframes, css } from 'styled-components';
import { ReactComponent as Hamburger } from 'styles/sidebarIcon/hamburger.svg';
import { ReactComponent as Close } from 'styles/commonIcon/close.svg';

import Header from './Header';
import Sidebar from './Sidebar';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import ROUTER from 'constants/routerConst';

export default function DashBoardLayout() {
  const navigate = useNavigate();
  const { checkUser } = getEncryptionStorage();
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const theme = useTheme();
  const desktopSize = theme.screen.desktopSize;

  useEffect(() => {
    if (!checkUser) {
      navigate(ROUTER.PATH.MAIN);
    }
  }, [checkUser, navigate]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= desktopSize) {
        setIsSidebarHidden(true);
        setIsMobileView(true);
      } else {
        setIsSidebarHidden(false);
        setIsMobileView(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [setIsSidebarHidden, setIsMobileView, desktopSize]);

  const handleSidebarToggle = useCallback(e => {
    e.stopPropagation();
    setIsSidebarHidden(prev => !prev);
  }, []);

  return (
    <>
      {checkUser && (
        <LayoutWrapper>
          {isMobileView && (
            <SidebarBtnContainer onClick={handleSidebarToggle}>
              <AlaramIcon $isHidden={isSidebarHidden} />
              <ArrowDownIcon $isHidden={isSidebarHidden} />
            </SidebarBtnContainer>
          )}

          <Header
            isSidebarHidden={isSidebarHidden}
            setIsSidebarHidden={setIsSidebarHidden}
            isMobileView={isMobileView}
          />
          <Sidebar
            isSidebarHidden={isSidebarHidden}
            setIsSidebarHidden={setIsSidebarHidden}
          />
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </LayoutWrapper>
      )}
    </>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const OutletContainer = styled.div`
  width: calc(100% - 12.5rem);
  height: 100%;
  max-height: 100vh;
  min-width: 52.5rem;
  margin-left: auto;
  padding: 9.375rem 3.75rem 3.4375rem 3.75rem;
  background-color: ${props => props.theme.color.blue.brandColor1};
  @media (max-width: ${props => props.theme.screen.desktop}) {
    width: calc(100vw);
  }
`;

const SidebarBtnContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  height: 6.25rem;
  z-index: 1001;
  margin-left: 2rem;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: rotate(360deg);
  }
`;

const IconAnimation = condition => css`
  animation: ${({ $isHidden }) => (condition($isHidden) ? fadeIn : 'none')} 0.2s
    linear;
  opacity: ${({ $isHidden }) => (condition($isHidden) ? 1 : 0)};
  transition: opacity 0.3s linear;
  ${props => props.theme.CursorActive};
`;

const AlaramIcon = styled(Hamburger)`
  ${IconAnimation($isHidden => $isHidden)}
  animation: 0.2s linear 0s 1 normal none running crbsY;
  opacity: 1;
  transition: opacity 0.3s linear 0s;
  path {
    stroke: white;
  }
  ${props => props.theme.CursorActive};
`;

const ArrowDownIcon = styled(Close)`
  position: absolute;
  top: 1rem;
  path {
    stroke: black;
  }
  ${IconAnimation($isHidden => !$isHidden)};
`;
