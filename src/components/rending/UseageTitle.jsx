import React from 'react';
import styled from 'styled-components';

export default function UseageTitle({ adminUseage, num, children }) {
  return (
    <>
      <UseageTitleContainer>
        <Tags adminUseage={adminUseage}>
          <span>{adminUseage ? '관리자 기능' : '사원 기능'}</span>
          <Dots>
            <span>{num}</span>
          </Dots>
        </Tags>
        <UseageDetail>
          <h1>{children}</h1>
        </UseageDetail>
      </UseageTitleContainer>
    </>
  );
}

const UseageTitleContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 1rem;
`;

const Tags = styled.div`
  ${props => props.theme.FlexRow};
  padding: 0.75rem 1rem;
  border-radius: 3rem;
  width: fit-content;
  border: 2px solid
    ${props => (props.adminUseage === 'true' ? '#48a239' : '#E68047')};
  font-weight: 600;
  color: ${props => (props.adminUseage === 'true' ? '#48a239' : '#E68047')};
`;

const Dots = styled.div`
  padding-left: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

const UseageDetail = styled.div`
  ${props => props.theme.FlexRow};
  h1 {
    font-size: 2.25rem;
    color: ${props => props.theme.color.blue.brandColor6};
    line-height: 1.4;
    white-space: pre;
  }
`;
