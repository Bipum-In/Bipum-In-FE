import React from 'react';
import styled from 'styled-components';

import Logo from 'components/layout/Logo';
import Button from 'elements/Button';

import { ReactComponent as ReturnIcon } from 'styles/commonIcon/return.svg';

export default function MasterHeader({ logoutClick, isLogin, navigate }) {
  return (
    <HeaderStyles>
      <HeaderContainer>
        <HeaderLogoContainer>
          <Logo />
        </HeaderLogoContainer>
        <LoginContainer>
          <ReturnDashboardBtn onClick={() => navigate('/')}>
            비품인 홈으로 돌아가기
            <ReturnIcon />
          </ReturnDashboardBtn>
          {isLogin && <LogoutBtn onClick={logoutClick}>로그아웃</LogoutBtn>}
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
  padding: 0rem 5rem;
  width: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  margin-left: auto;
`;
const HeaderLogoContainer = styled.div`
  flex: 0 0 auto;
  pointer-events: none;
`;

const HeaderBtnStyle = styled(Button)`
  justify-content: center;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  > div {
    align-items: center;
    gap: 0.7rem;
  }
`;

const ReturnDashboardBtn = styled(HeaderBtnStyle)`
  background-color: ${props => props.theme.color.blue.brandColor6};
  color: white;
  height: 3rem;
`;

const LogoutBtn = styled(HeaderBtnStyle)`
  border: 0.0625rem solid ${props => props.theme.color.blue.brandColor6};
  color: ${props => props.theme.color.blue.brandColor6};
  height: 3rem;
`;
