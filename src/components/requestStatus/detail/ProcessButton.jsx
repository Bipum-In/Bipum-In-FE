import React from 'react';
import styled from 'styled-components';

export default function ProcessButton({
  requestStatus,
  requestType,
  handleAccept,
  handleDecline,
  handleModalShow,
  handleRepairModalShow,
}) {
  return (
    <ApproveAndRefuse>
      {requestStatus === '처리전' && (
        <>
          <AcceptBtn onClick={handleAccept}>승인</AcceptBtn>
          <DeclineBtn onClick={handleDecline}>거절</DeclineBtn>
        </>
      )}
      {requestStatus === '처리전' && requestType === '수리 요청' && (
        <DisposeBtn onClick={handleModalShow}>폐기</DisposeBtn>
      )}
      {requestStatus === '처리중' && (
        <>
          <RepairBtn onClick={handleRepairModalShow}>수리완료</RepairBtn>
          <DisposeBtn onClick={handleModalShow}>폐기</DisposeBtn>
        </>
      )}
    </ApproveAndRefuse>
  );
}

const ApproveAndRefuse = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0 3.9375rem;
  gap: 1rem;

  button {
    font-size: 1.0625rem;
    font-weight: 600;
  }
`;

const AcceptBtn = styled.button`
  max-width: 12.625rem;
  width: 100%;
  height: 2.5rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
  border: 1px solid ${props => props.theme.color.blue.brandColor6};
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
`;

const DeclineBtn = styled(AcceptBtn)`
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: white;
  border: 1px solid ${props => props.theme.color.blue.brandColor6};
  cursor: pointer;
`;

const DisposeBtn = styled(AcceptBtn)`
  color: #b6897b;
  background-color: white;
  border: 1px solid #b6897b;
  cursor: pointer;
`;

const RepairBtn = styled(DeclineBtn)``;
