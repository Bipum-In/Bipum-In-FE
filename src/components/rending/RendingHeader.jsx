import React from 'react';
import styled from 'styled-components';

import Logo from 'components/layout/Logo';
import Button from 'elements/Button';

import { ReactComponent as KakaoIcon } from 'styles/commonIcon/kakao.svg';
import { ReactComponent as ReturnIcon } from 'styles/commonIcon/return.svg';

export default function RendingHeader({
  isLoggedIn,
  logoClick,
  loginClick,
  moveDashboard,
  logoutClick,
}) {
  return (
    <HeaderStyles>
      <HeaderContainer>
        <HeaderLogoContainer onClick={logoClick}>
          <Logo />
        </HeaderLogoContainer>
        <LoginContainer>
          {!isLoggedIn ? (
            <KakaoLoginBtn onClick={loginClick}>
              <KakaoIcon />
              카카오 로그인
            </KakaoLoginBtn>
          ) : (
            <>
              <ReturnDashboardBtn onClick={moveDashboard}>
                비품인으로 돌아가기
                <ReturnIcon />
              </ReturnDashboardBtn>
              <LogoutBtn onClick={logoutClick}>로그아웃</LogoutBtn>
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
  cursor: pointer;
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
