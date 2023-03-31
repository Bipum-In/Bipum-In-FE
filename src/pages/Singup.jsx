import React from 'react';
import styled from 'styled-components';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = async data => {
    reset();
    navigate('/');
  };

  return (
    <LoginLayout>
      <LoginWrapper>
        <LoginLeftSection>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginTitleBox>
              <LoginTitle>이메일 주소로 가입하기</LoginTitle>
              <small>이메일 주소를 입력해주세요.</small>
            </LoginTitleBox>
            <LoginInputContainer>
              <Input
                reg
                {...register('email', {
                  required: '이메일 주소를 입력해주세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '이메일 형식으로 입력해주세요',
                  },
                })}
                type="text"
                placeholder="이메일"
              />

              <Button reg>인증하기</Button>
            </LoginInputContainer>
            <span>{errors.email?.message}</span>
            <span>{watch('email')}</span>
          </LoginForm>
        </LoginLeftSection>
        <LoginRightSection></LoginRightSection>
      </LoginWrapper>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  height: 100%;
  min-height: 600px;
  position: relative;
`;
const LoginWrapper = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.wh100}
  flex: auto;
`;

const LoginLeftSection = styled.div`
  ${props => props.theme.FlexCol}
  ${props => props.theme.FlexCenter}
  flex: 5;
`;

const LoginRightSection = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  flex: 5;
  background: ${props => props.theme.color.blue};
`;

const LoginForm = styled.form`
  ${props => props.theme.FlexCol}
  justify-content: flex-start;
  gap: 1rem 0;
`;

const LoginTitleBox = styled.div`
  margin-bottom: 1rem;
  small {
    opacity: 0.8;
  }
`;

const LoginTitle = styled.h1`
  margin-bottom: 1rem;
`;

const LoginInputContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  width: 100%;
`;
