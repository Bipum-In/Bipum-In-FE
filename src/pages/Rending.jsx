import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RendingHeader from 'components/rending/RendingHeader';
import RendingDots from 'components/rending/RendingDots';
import RendingScrollPage from 'components/rending/pages/RendingScrollPage';

import { removeCookie } from 'utils/cookie';
import Storage from 'utils/localStorage';
import { useIsLoggedIn } from 'hooks/useIsLoggedIn';
import { logoutSuccess } from 'redux/modules/authSlice';
import { getEncryptionStorage } from 'utils/encryptionStorage';

import ROUTER from 'constants/routerConst';
import QUERY from 'constants/query';
import useThrottleCallBack from 'hooks/useThrottleCallback';

export default function Rending() {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  useThrottleCallBack(handleScroll, 200, 'wheel');

  const currentUrl =
    document.location.href === 'http://localhost:3000/'
      ? process.env.REACT_APP_LOCALHOST_URL
      : process.env.REACT_APP_S3_URL;

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
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${currentUrl}/login/oauth2/code/google&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const handleReturnDashboard = () => {
    const { isAdmin } = getEncryptionStorage();

    const targetPath = isAdmin
      ? ROUTER.PATH.ADMIN.DASHBOARD
      : ROUTER.PATH.USER.DASHBOARD;
    navigate(targetPath);
  };

  const handleLogoutBtn = e => {
    e.preventDefault();
    removeCookie(QUERY.COOKIE.COOKIE_NAME);
    Storage.clearLocalStorage();
    dispatch(logoutSuccess());
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
      />
      <RendingScrollPage
        pageIndex={pageIndex}
        setPageCount={setTotalPages}
        setPageIndex={setPageIndex}
        onclick={handleBackToFirstPage}
      />
      <RendingDots
        pageIndex={pageIndex}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
      />
    </>
  );
}
