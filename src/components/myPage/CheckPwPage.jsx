import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from 'styles/logo.svg';
import KakaoUserInfo from 'styles/rendingIcon/kakaoUserInfo.svg';

import { styles } from 'components/common/commonStyled';
import Input from 'elements/Input';
import Button from 'elements/Button';
import alertModal from 'utils/alertModal';

import Axios from 'api/axios';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function CheckPwPage({ setEditPage }) {
  const moveEditMyInfo = () => setEditPage('');

  const [password, setPassword] = useState('');

  const handleCheckPw = e => {
    e.preventDefault();
    axios.post('/api/user/check', { password }).then(res => {
      if (res.data.data === true) {
        moveEditMyInfo();
      } else {
        alertModal(false, '비밀번호가 일치하지 않습니다.', 2);
      }
    });
  };

  return (
    <>
      <LoginWrapper bg={KakaoUserInfo}>
        <SetUserInfo>
          <Logo />
          <SetUserInputContainer>
            <styles.TypeBox>
              <TypeTitles requiredinput="true">2차 비밀번호</TypeTitles>
              <Input
                value={password}
                setState={e => setPassword(e.target.value)}
                singupInput
                type="password"
                placeholder="6자리 비밀번호"
                maxLength={6}
                autoComplete="off"
              />
            </styles.TypeBox>
          </SetUserInputContainer>
          <SetUserSubmitContainer>
            <Button
              submit
              onClick={handleCheckPw}
              disabled={password.length < 6}
            >
              완료
            </Button>
          </SetUserSubmitContainer>
        </SetUserInfo>
      </LoginWrapper>
    </>
  );
}

const TypeTitles = styled.div`
  width: 12.75rem;
`;
const LoginWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 12.5rem);
  height: calc(100vh - 6.25rem);
  margin-top: -3.2rem;
  margin-left: -3.8rem;
  ::before {
    content: '';
    background: url(${props => props.bg}) no-repeat center center/cover;
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${props => props.theme.screen.desktop}) {
    margin-left: -3.8rem;
    width: 100vw;
  }
`;

const SetUserInfo = styled.div`
  position: absolute;
  ${props => props.theme.FlexCol};
  justify-content: space-around;
  ${props => props.theme.Boxshadow};
  width: 30.375rem;
  height: 36.9375rem;
  background: white;
  padding: 5rem 6.5625rem;
  > svg {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
  }
`;

const SetUserInputContainer = styled.div`
  ${props => props.theme.FlexCol}
`;

const SetUserSubmitContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  > button {
    width: 5.25rem;
    font-weight: bold;
  }
`;
