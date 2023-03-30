import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../styles/logo.svg';
import Button from '../../elements/Button';
import { removeCookie } from '../../utils/cookie';
import Storage from '../../utils/localStorage';

import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

import ROUTER from '../../constants/routerConst';
import QUERY from '../../constants/query';

import { ReactComponent as KakaoIcon } from '../../styles/commonIcon/kakao.svg';
import { ReactComponent as ReturnIcon } from '../../styles/commonIcon/return.svg';

export default function RendingHeader() {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_LOCALHOST_URL}/api/user/kakao/callback&response_type=code`;
  };

  const handleReturnDashboard = () => navigate(ROUTER.PATH.ADMIN_DASHBOARD);
  const handleLogoutBtn = e => {
    e.preventDefault();
    window.location.reload();
    removeCookie(QUERY.COOKIE.COOKIE_NAME);
    Storage.clearLocalStorage();
  };

  return (
    <HeaderStyles>
      <HeaderContainer>
        <HeaderLogoContainer>
          <Link to="/">
            <LogoImg src={Logo} alt="비품인" />
          </Link>
        </HeaderLogoContainer>
        <LoginContainer>
          {!isLoggedIn ? (
            <KakaoLoginBtn onClick={handleKakaoLogin}>
              <KakaoIcon />
              카카오 로그인
            </KakaoLoginBtn>
          ) : (
            <>
              <ReturnDashboardBtn onClick={handleReturnDashboard}>
                비품인으로 돌아가기
                <ReturnIcon />
              </ReturnDashboardBtn>
              <LogoutBtn onClick={handleLogoutBtn}>로그아웃</LogoutBtn>
            </>
          )}
        </LoginContainer>
      </HeaderContainer>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 164px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: transparent;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 80px;
  width: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  margin-left: auto;
`;
const HeaderLogoContainer = styled.div`
  flex: 0 0 auto;
`;
const LogoImg = styled.img`
  height: 31px;
  width: 116px;
  display: block;
`;

const HeaderBtnStyle = styled(Button)`
  justify-content: center;
  padding: 16px 24px;
  border-radius: 5px;
  > div {
    align-items: center;
    gap: 11.2px;
  }
`;
const KakaoLoginBtn = styled(HeaderBtnStyle)`
  background-color: #fae64d;
  height: 53px;
`;

const ReturnDashboardBtn = styled(HeaderBtnStyle)`
  background-color: ${props => props.theme.color.blue.brandColor6};
  color: white;
  height: 45px;
`;

const LogoutBtn = styled(HeaderBtnStyle)`
  border: 0.0625rem solid ${props => props.theme.color.blue.brandColor6};
  color: ${props => props.theme.color.blue.brandColor6};
  height: 45px;
`;
