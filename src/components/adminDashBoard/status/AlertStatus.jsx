import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styled, { css } from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';

import { v4 as uuidv4 } from 'uuid';
import { FormatKoreanTime } from 'utils/formatDate';

import EmptyAlarm from './EmptyAlarm';

import STRING from 'constants/string';

export default function AlertStatus({ isAdmin, getDashboard }) {
  const [alarm, setAlarm] = useState(false);
  const { notifications } = getDashboard.data;
  const { sseAdminData, sseUserData } = useSelector(state => state.sseSlice);
  const sseData = isAdmin ? sseAdminData : sseUserData;
  return (
    <>
      {notifications && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
          <styleds.AlertAndAddContainer>
            {alarm && <LnbAlarmPoint />}
            {notifications.length === 0 && <EmptyAlarm />}
            {[...sseData, ...notifications].map(data => (
              <AlertListContainer key={uuidv4()} defaultValue={data.requestId}>
                {isAdmin ? (
                  <AlertImgContainer>
                    <AlertImg src={data.image} alt="" />
                  </AlertImgContainer>
                ) : (
                  <AlertStatusContainer>
                    <Status status={STRING.REQUEST_STATUS[data.acceptResult]}>
                      {STRING.REQUEST_STATUS[data.acceptResult]}
                    </Status>
                  </AlertStatusContainer>
                )}
                <AlertDetailContainer>
                  <AlertTitle>{data.content}</AlertTitle>
                  <AlertData>{FormatKoreanTime(data.createdAt)}</AlertData>
                </AlertDetailContainer>
              </AlertListContainer>
            ))}
          </styleds.AlertAndAddContainer>
        </styleds.EquipmentTopContainer>
      )}
    </>
  );
}

const AlertListContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.0625rem;
  &:before {
    content: '';
    position: absolute;
    bottom: -1.03125rem;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
  &:last-child {
    margin-bottom: 0;
  }
  &:last-child:before {
    display: none;
  }
`;

const AlertImgContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
`;

const AlertStatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  min-width: ${props => props.width};
  border-radius: 0.25rem;
  width: 2.5rem;
  height: 1.8125rem;

  ${props =>
    props.status === '승인' &&
    css`
      color: ${props => props.theme.color.accpet};
      border: 1px solid ${props => props.theme.color.accpet};
    `}

  ${props =>
    props.status === '거절' &&
    css`
      color: ${props => props.theme.color.reject};
      border: 1px solid ${props => props.theme.color.reject};
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      color: ${props => props.theme.color.remove};
      border: 1px solid ${props => props.theme.color.remove};
    `}
`;

const AlertImg = styled.img`
  object-fit: cover;
  ${props => props.theme.wh100};
  border-radius: 0.25rem;
`;

const AlertDetailContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: space-around;
  height: 100%;
`;

const AlertTitle = styled.span`
  font-size: 0.875rem;
`;
const AlertData = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.color.grey.brandColor5};
`;

const LnbAlarmPoint = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background-color: rgb(255, 153, 0);
`;
