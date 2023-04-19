import React from 'react';
import styled from 'styled-components';
import Input from 'elements/Input';
import PLACEHOLDER from 'constants/placeholder';

export default function ChangePassword({
  inputPw,
  inputPwHandler,
  checkSame,
  inputCheckPw,
  checkPwRegex,
  doubleCheckPwRegex,
  alertPw,
  alertCheckPw,
}) {
  return (
    <>
      <ChangePwContainer>
        <p>2차 비밀번호 변경</p>
        <ChangePwBox>
          <ChangePw>
            <span>새 2차 비밀번호</span>
            <Input
              value={inputPw}
              onChange={inputPwHandler}
              singupInput
              type="password"
              placeholder={PLACEHOLDER.PASSWORD_INPUT_LENGTH(6)}
              maxLength={6}
            />
          </ChangePw>
          <LoginAlertSpan isCurrent={checkPwRegex}>{alertPw}</LoginAlertSpan>
        </ChangePwBox>
        <ChangePwBox>
          <ChangePw>
            <span>새 2차 비밀번호 확인</span>
            <Input
              value={inputCheckPw}
              onChange={checkSame}
              singupInput
              type="password"
              placeholder={PLACEHOLDER.PASSWORD_INPUT_LENGTH(6)}
              maxLength={6}
            />
          </ChangePw>
          <LoginAlertSpan isCurrent={doubleCheckPwRegex}>
            {alertCheckPw}
          </LoginAlertSpan>
        </ChangePwBox>
      </ChangePwContainer>
    </>
  );
}

const LoginAlertSpan = styled.div`
  bottom: -2rem;
  left: 0.5rem;
  display: flex;
  text-align: start;
  font-size: 0.8rem;
  padding: 0.2rem;
  color: ${props => (props.isCurrent ? '#58793e' : 'tomato')};
`;

const ChangePwContainer = styled.form`
  ${props => props.theme.FlexCol};

  gap: 0.75rem;
  p {
    color: ${props => props.theme.color.blue.brandColor7};
    font-weight: 600;
    font-size: 1.125rem;
    margin: 0 0 2rem;
  }
`;

const ChangePwBox = styled.div`
  justify-content: center;
  height: 4.6875rem;

  span {
    color: ${props => props.theme.color.blue.brandColor6};
    font-weight: 600;
  }
  input {
    margin-left: auto;
    width: 7.3125rem;
    height: 2.5625rem;
    background: ${props => props.theme.color.grey.brandColor1};
  }
`;

const ChangePw = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: center;
  height: 3.125rem;
`;
