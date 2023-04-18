import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Alaram } from 'styles/commonIcon/alarm.svg';
import AlertStatus from 'components/adminDashBoard/status/AlertStatus';

const Alarm = ({
  isAdmin,
  showAlarm,
  alarmOutsideRef,
  sseAdminLength,
  sseUserLength,
  onClickAlaram,
}) => {
  const count = isAdmin ? sseAdminLength : sseUserLength;

  return (
    <AlertStatusContainer ref={alarmOutsideRef} show={showAlarm}>
      <IconContainer onClick={onClickAlaram}>
        <Alaram />
        {count > 0 && (
          <AlaramCount>
            <span />
          </AlaramCount>
        )}
      </IconContainer>
      {showAlarm && <AlertStatus isAdmin={isAdmin} />}
    </AlertStatusContainer>
  );
};

export default React.memo(Alarm);

const AlertStatusContainer = styled.div`
  position: relative;
  //알림 container
  & > article {
    position: absolute;
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    top: 0;
    right: 0;
    transform: translate(-9.5rem, 3rem);
  }
  //알림 박스
  & > article > div > div {
    width: 25rem;
  }
  //알림 타이틀 및 전체 삭제 버튼
  & > article > div > article {
    display: none;
  }
  //알림이 존재하지 않습니다.
  & > article > div > div > div {
    span {
      font-size: 0.9rem;
    }
    svg {
      width: 2rem;
    }
  }
`;

const IconContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 1.875rem;
  height: 1.875rem;
  ${props =>
    props.search === 'true' &&
    css`
      margin: 0 0.8125rem 0 1.3125rem;
    `}
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const AlaramCount = styled.div`
  position: absolute;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background: ${props => props.theme.color.blue.brandColor7};
  width: 1rem;
  height: 1rem;
  padding: 0.5rem;
  transform: translate(0.7rem, -0.7rem);
  border-radius: 50%;

  span {
    ${props => props.theme.FlexRow};
    ${props => props.theme.FlexCenter};
    font-size: 0.75rem;
    padding: 0.4rem;
    width: 0.3rem;
    height: 0.3rem;
    color: white;
    background-color: red;
    border-radius: 50%;
  }
`;
