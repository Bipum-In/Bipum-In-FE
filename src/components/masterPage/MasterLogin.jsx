import React from 'react';
import styled from 'styled-components';
import Button from 'elements/Button';

import Input from 'elements/Input';
import PLACEHOLDER from 'constants/placeholder';

export default function MasterLogin({ state, onchange, onclick }) {
  return (
    <>
      <SetUserInfo onSubmit={onclick}>
        <h2>마스터 계정 로그인</h2>
        <LoginInputContainer>
          <LoginInputBox>
            <LoginTitle>아이디</LoginTitle>
            <LoginInput
              placeholder={PLACEHOLDER.ENTER_INPUT('아이디를')}
              maxLength="15"
              name="username"
              value={state.username}
              onChange={onchange}
            />
          </LoginInputBox>
          <LoginInputBox>
            <LoginTitle>비밀번호</LoginTitle>
            <LoginInput
              placeholder={PLACEHOLDER.ENTER_INPUT('비밀번호를')}
              type="password"
              name="password"
              value={state.password}
              onChange={onchange}
              autocomplete="off"
              maxLength="15"
            />
          </LoginInputBox>
        </LoginInputContainer>
        <Button submit disabled={!state.username || !state.password}>
          로그인
        </Button>
      </SetUserInfo>
    </>
  );
}

const SetUserInfo = styled.form`
  position: absolute;
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.Boxshadow};
  background: white;
  padding: 5rem 6.5625rem;
  gap: 3rem;
  > h2 {
    color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const LoginInputContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 2.25rem;
`;

const LoginInputBox = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
`;

const LoginTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1.25rem;
  white-space: pre;
`;

const LoginInput = styled(Input)`
  width: 11.3125rem;
  height: 2.4375rem;
  font-size: 1rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  &::placeholder {
    color: ${props => props.theme.color.grey.brandColor5};
  }
`;
