import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Input from 'elements/Input';
import Button from 'elements/Button';
import { api } from 'api/axios';
import { ReactComponent as BlackCancel } from 'styles/commonIcon/blackCancel.svg';
import PLACEHOLDER from 'constants/placeholder';
import QUERY from 'constants/query';
import useRegexInput from 'hooks/useRegexInput';

export default function RequestBox({ handleModalClose }) {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [address, setAddress] = useState('');

  const handleNameClear = () => setCompanyName('');
  const handleNumberClear = () => setPhoneNumber('');
  const handleEmailClear = () => setEmail('');
  const handleAddressClear = () => setAddress('');

  function handleChangePhone(event) {
    const { value } = event.target;
    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(formattedValue);
  }

  const handleChangeEmail = e => {
    const { value } = e.target;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (value) {
      setEmailValid(emailRegex.test(value));
    } else {
      setEmailValid(null);
    }

    setEmail(value);
  };
  const handleSubmit = () => {
    const stringToNumPrice = phoneNumber.replace(/-/g, '');

    const data = {
      partnersName: companyName,
      phone: stringToNumPrice,
      email,
      address,
    };

    api.post(QUERY.END_POINT.PARTNERS.LIST, data).then(() => {
      handleModalClose();
    });
  };
  console.log(`${!!email}`);
  return (
    <RequestWrapper>
      <RequestContainer>
        <Box>
          <Title requiredinput="true">업체명</Title>
          <Input
            type="text"
            placeholder={PLACEHOLDER.ENTER_INPUT('업체를')}
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            minLength="1"
            maxLength="15"
          />
          {companyName && (
            <CancelInputWrapper onClick={handleNameClear}>
              <CancelIcon />
            </CancelInputWrapper>
          )}
        </Box>
      </RequestContainer>
      <RequestContainer>
        <Box>
          <Title>전화 번호</Title>
          <Input
            placeholder={PLACEHOLDER.ENTER_INPUT('전화번호를')}
            value={phoneNumber}
            onChange={handleChangePhone}
          />
          {phoneNumber && (
            <CancelInputWrapper onClick={handleNumberClear}>
              <CancelIcon />
            </CancelInputWrapper>
          )}
        </Box>
      </RequestContainer>
      <RequestContainer>
        <Box>
          <Title>이메일</Title>

          <EmailInput
            type="email"
            placeholder={PLACEHOLDER.ENTER_INPUT('이메일을')}
            value={email}
            onChange={handleChangeEmail}
            regex={`${emailValid}`}
          />
          {email && (
            <CancelInputWrapper onClick={handleEmailClear}>
              <CancelIcon />
            </CancelInputWrapper>
          )}
        </Box>
      </RequestContainer>
      <RequestContainer>
        <Box>
          <Title>주소</Title>
          <Input
            placeholder={PLACEHOLDER.ENTER_INPUT('주소를')}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          {address && (
            <CancelInputWrapper onClick={handleAddressClear}>
              <CancelIcon />
            </CancelInputWrapper>
          )}
        </Box>
      </RequestContainer>
      <CloseContainer>
        <Button onClick={handleSubmit} mainBtn="fill" type="button">
          등록 완료
        </Button>
      </CloseContainer>
    </RequestWrapper>
  );
}

const CancelInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CancelIcon = styled(BlackCancel)`
  position: absolute;
  right: 0.5rem;
  height: 1rem;
  width: 1rem;
`;
const CloseContainer = styled.div`
  gap: 1rem;
  button {
    width: 27.6875rem;
    height: 2.75rem;
    border-radius: 0.25rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  min-width: 6.25rem;
  text-align: left;

  ${props =>
    props.requiredinput === 'true' &&
    css`
      &::before {
        content: '*';
        color: red;
        padding-right: 0.3125rem;
      }
    `}
`;

const RequestContainer = styled.div`
  display: flex;
  height: 2.125rem;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  padding-bottom: 2.25rem;

  input {
    width: 100%;
    height: 2.125rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem 0.5625rem 1rem;
  }
`;

const RequestWrapper = styled.div`
  ${props => props.theme.FlexCol};
  gap: 2.25rem;
`;

const EmailInput = styled(Input)`
  border: ${props => (props.regex === 'false' ? '1px solid #ff8e8e' : 'none')};
  background: ${props => props.regex === 'false' && '#ffe6e6'} !important;
`;
