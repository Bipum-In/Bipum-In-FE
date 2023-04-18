import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RendingHeader from 'components/rending/RendingHeader';
import RendingDots from 'components/rending/RendingDots';
import RendingScrollPage from 'components/rending/pages/RendingScrollPage';
import { ReactComponent as ScrollUp } from 'styles/commonIcon/scrollUp.svg';

import { useIsLoggedIn } from 'hooks/useIsLoggedIn';
import { logoutSuccess } from 'redux/modules/authSlice';
import { getEncryptionStorage } from 'utils/encryptionStorage';

import ROUTER from 'constants/routerConst';
import useThrottleCallBack from 'hooks/useThrottleCallback';
import { api } from 'api/axios';
import logout from 'utils/logout';
import styled from 'styled-components';

export default function Rending() {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const { isAdmin, userRole } = getEncryptionStorage();

  const [searchParams] = useSearchParams();
  const initialPageIndex = Number(searchParams.get('pageIndex')) || 0;

  useEffect(() => {
    setPageIndex(initialPageIndex);
  }, [initialPageIndex]);

  useThrottleCallBack(handleScroll, 1200, 'wheel');

  const currentUrl =
    document.location.href === 'http://localhost:3000/'
      ? process.env.REACT_APP_LOCALHOST_URL
      : process.env.REACT_APP_VERCEL_URL;

  function handleScroll(e) {
    if (e.deltaY > 0) {
      setPageIndex(prevIndex =>
        prevIndex < totalPages - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.deltaY < 0) {
      setPageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${currentUrl}/login&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const handleReturnDashboard = () => {
    const targetPath = isAdmin
      ? ROUTER.PATH.ADMIN.DASHBOARD
      : ROUTER.PATH.USER.DASHBOARD;
    navigate(targetPath);
  };

  const handleLogoutBtn = async e => {
    e.preventDefault();

    try {
      await api.post(`/api/user/logout`);
      dispatch(logoutSuccess());
      logout(() => navigate(ROUTER.PATH.MAIN));
    } catch (error) {
      logout(() => {
        window.location.reload();
      });
    }
  };

  const handleBackToFirstPage = () => setPageIndex(0);

  return (
    <>
      <RendingHeader
        isLoggedIn={isLoggedIn}
        loginClick={handleGoogleLogin}
        logoClick={handleBackToFirstPage}
        moveDashboard={handleReturnDashboard}
        logoutClick={handleLogoutBtn}
        isMaster={userRole}
        navigate={navigate}
      />
      <RendingScrollPage
        pageIndex={pageIndex}
        setPageCount={setTotalPages}
        setPageIndex={setPageIndex}
      />
      <RendingDots
        pageIndex={pageIndex}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
      />
      {pageIndex !== 0 && (
        <ScrollToTopContainer>
          <ScrollToTopIcon onClick={handleBackToFirstPage} />
        </ScrollToTopContainer>
      )}
    </>
  );
}

const ScrollToTopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 80px;
  z-index: 1;
`;

const ScrollToTopIcon = styled(ScrollUp)`
  width: 50px;
  height: 50px;
  color: ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
  transition: color 0.2s, opacity 0.2s, transform 0.3s;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.269));
  &:active {
    transform: scale(0.9);
  }
  :hover {
    transform: scale(1.1);
    svg {
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.269));
    }
  }
`;
