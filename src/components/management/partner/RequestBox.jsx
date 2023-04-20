import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Input from 'elements/Input';
import Button from 'elements/Button';
import { api } from 'api/axios';
import { ReactComponent as BlackCancel } from 'styles/commonIcon/blackCancel.svg';
import PLACEHOLDER from 'constants/placeholder';
import QUERY from 'constants/query';

export default function RequestBox({ handleModalClose }) {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleNameClear = () => setCompanyName('');
  const handleNumberClear = () => setPhoneNumber('');
  const handleEmailClear = () => setEmail('');
  const handleAddressClear = () => setAddress('');

  const handleSubmit = () => {
    const data = {
      partnersName: companyName,
      phone: phoneNumber,
      email,
      address,
    };

    api.post(QUERY.END_POINT.PARTNERS.LIST, data).then(() => {
      handleModalClose();
    });
  };
  //선중이형 validataion 추가해주세요 ㅋㅎㅋㅎㅋㅎㅋㅎ
  return (
    <RequestWrapper>
      <RequestContainer>
        <Box>
          <Title requiredinput="true" marginRight="1.6125rem">
            업체명
          </Title>

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
          <Title marginRight="1.3125rem">전화 번호</Title>
          <Input
            placeholder={PLACEHOLDER.ENTER_INPUT('전화번호를')}
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
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
          <Title marginRight="2.375rem">이메일</Title>
          <Input
            type="email"
            placeholder={PLACEHOLDER.ENTER_INPUT('이메일을')}
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <Title marginRight="3.1875rem">주소</Title>
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
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.125rem;
  color: ${props => props.theme.color.blue.brandColor6};

  ${({ marginRight }) =>
    marginRight &&
    css`
      margin-right: ${marginRight};
    `}

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
    width: 12rem;
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
