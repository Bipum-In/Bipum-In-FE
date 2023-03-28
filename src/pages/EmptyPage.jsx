import React from 'react';
import styled, { keyframes } from 'styled-components';

const wave = keyframes`
  00%{
    transform: translateY(0em);
  }
  60%{
    transform: translateY(-0.2em);
  }
  100%{
    transform: translateY(0em);
  }
`;

const EmptyPageWrapper = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.wh100};
`;
const WaveSpan = styled.span`
  display: inline-block;
  animation-name: ${wave};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  font-size: 5rem;
  font-weight: bold;
`;

const EmptyContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
`;

export default function EmptyPage() {
  const text = '샤워좀후딱하고오겠습니다잇';
  return (
    <EmptyPageWrapper>
      <EmptyContainer>
        {text.split('').map((char, index) => (
          <WaveSpan key={index} style={{ animationDelay: `${index * 100}ms` }}>
            {char}
          </WaveSpan>
        ))}
      </EmptyContainer>
    </EmptyPageWrapper>
  );
}
