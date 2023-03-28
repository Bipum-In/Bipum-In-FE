import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../styles/logo.svg';
import Button from '../../elements/Button';
import isLogin from '../../utils/isLogin';
import { removeCookie } from '../../utils/cookie';
import Storage from '../../utils/localStorage';

import ROUTER from '../../constants/routerConst';
import QUERY from '../../constants/query';

import { ReactComponent as KakaoIcon } from '../../styles/commonIcon/kakao.svg';
import { ReactComponent as ReturnIcon } from '../../styles/commonIcon/return.svg';

export default function RendingHeader() {
  const navigate = useNavigate();

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
          {!isLogin ? (
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
  height: 10.25rem;
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
  padding: 0px 5rem;
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
  height: 1.9375rem;
  width: 7.25rem;
  display: block;
`;

const HeaderBtnStyle = styled(Button)`
  justify-content: center;
  padding: 1rem 1.5rem;
  border-radius: 0.3125rem;
  > div {
    align-items: center;
    gap: 0.7rem;
  }
`;
const KakaoLoginBtn = styled(HeaderBtnStyle)`
  background-color: #fae64d;
  height: 3.3125rem;
`;

const ReturnDashboardBtn = styled(HeaderBtnStyle)`
  background-color: ${props => props.theme.color.blue.brandColor6};
  color: white;
  height: 2.8125rem;
`;

const LogoutBtn = styled(HeaderBtnStyle)`
  border: 1px solid ${props => props.theme.color.blue.brandColor6};
  color: ${props => props.theme.color.blue.brandColor6};
  height: 2.8125rem;
`;
