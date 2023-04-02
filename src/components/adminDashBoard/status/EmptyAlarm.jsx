import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Bell } from 'styles/commonIcon/bellRinging.svg';

export default function EmptyAlarm() {
  return (
    <>
      <EmptyAlarmWrapper>
        <EmptyAlarmContainer>
          <Bell />
          <EmptyTitle>아무런 알림이 존재하지 않습니다.</EmptyTitle>
        </EmptyAlarmContainer>
      </EmptyAlarmWrapper>
    </>
  );
}

const EmptyAlarmWrapper = styled.div`
  ${props => props.theme.AbsoluteTL};
  ${props => props.theme.wh100};
`;

const EmptyAlarmContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  gap: 1rem;
  height: 100%;
  svg {
    path {
      fill: ${props => props.theme.color.blue.brandColor5};
    }
  }
`;
const EmptyTitle = styled.span`
  font-size: 1.2rem;
  color: ${props => props.theme.color.blue.brandColor6};
  font-weight: bold;
`;
