import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from 'styles/logo.svg';
import KakaoUserInfo from 'styles/rendingIcon/kakaoUserInfo.svg';

import { styles } from 'components/common/commonStyled';
import Input from 'elements/Input';
import Button from 'elements/Button';
import alertModal from 'utils/alertModal';
import ScreenViewLoading from 'components/common/ScreenViewLoading';
import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';

import { api } from 'api/axios';
import PLACEHOLDER from 'constants/placeholder';
import QUERY from 'constants/query';

export default function CheckPwPage({ setEditPage }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPwModal, setForgotPwModal] = useModalState(false);

  const moveEditMyInfo = () => setEditPage('');
  const handleCheckPw = e => {
    e.preventDefault();
    api.post(QUERY.END_POINT.USER.CHECK_PASSWORD, { password }).then(res => {
      if (res.data.data === true) {
        moveEditMyInfo();
      } else {
        alertModal(false, '비밀번호가 일치하지 않습니다.', 2);
        setPassword('');
      }
    });
  };

  const handleTemporaryPassword = () => {
    setForgotPwModal(false);
    setIsLoading(true);
    api
      .post(QUERY.END_POINT.USER.CHANGE_PASSWORD, '', 5)
      .then(() => {
        alertModal(true, '임시 비밀번호가 발송되었습니다.', 2);
      })
      .catch(() => {
        alertModal(false, '임시 비밀번호 발송에 실패했습니다.', 2);
      })
      .finally(() => setIsLoading(false));
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
                onChange={e => setPassword(e.target.value)}
                singupInput
                type="password"
                placeholder={PLACEHOLDER.PASSWORD_INPUT_LENGTH(6)}
                maxLength={6}
                autoComplete="off"
              />
            </styles.TypeBox>
          </SetUserInputContainer>
          <ForgotPassword>
            <span>비밀번호를 잊으셨나요?</span>
            <Button type="button" onClick={() => setForgotPwModal(true)}>
              비밀번호 찾기
            </Button>
          </ForgotPassword>
          <CustomModal
            isOpen={forgotPwModal}
            onClose={() => setForgotPwModal(false)}
            submit={handleTemporaryPassword}
            text={'발송'}
          >
            <PwModalDetail>
              <Logo />
              비밀번호 재설정을 위해 비품인에 가입된 이메일로
              <br />
              비밀번호가 전송됩니다.
            </PwModalDetail>
          </CustomModal>
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
      <ScreenViewLoading isLoading={isLoading} lazyTime={1} center="true" />
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

const ForgotPassword = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  gap: 1rem;
  button {
    font-size: 1rem;
    color: ${props => props.theme.color.blue.brandColor6};
    font-weight: 600;
  }
`;

const PwModalDetail = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 2rem;
  line-height: 2;
`;
