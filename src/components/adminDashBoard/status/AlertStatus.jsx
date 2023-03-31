import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';
import { v4 as uuidv4 } from 'uuid';
import { FormatKoreanTime } from '../../../utils/formatDate';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { getCookie } from '../../../utils/cookie';
import QUERY from '../../../constants/query';
import Storage from '../../../utils/localStorage';
import STRING from '../../../constants/string';
import SSE from '../../../api/sse';

export default function AlertStatus({ isAdmin, getDashboard }) {
  const [alarm, setAlarm] = useState(false);
  const { notifications } = getDashboard.data;

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/subscribe`;
    const sse = new SSE(url, 20);

    sse.onMessage(event => {
      const checkJSON = event.data.split(' ')[0];
      const data = checkJSON !== 'EventStream' && JSON.parse(event.data);
      console.log(data);
    });

    return () => {
      sse.close();
      console.log('close');
    };
  }, []);

  return (
    <>
      {notifications && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
          <styleds.AlertAndAddContainer>
            {alarm && <LnbAlarmPoint />}
            {notifications.map(data => (
              <AlertListContainer key={uuidv4()}>
                {isAdmin ? (
                  <AlertImgContainer>
                    <AlertImg src={data.image} alt="" />
                  </AlertImgContainer>
                ) : (
                  <AlertStatusContainer>
                    <Status status={STRING.REQUEST_STATUS[data.accept_result]}>
                      {STRING.REQUEST_STATUS[data.accept_result]}
                    </Status>
                  </AlertStatusContainer>
                )}
                <AlertDetailContainer>
                  <AlertTitle>{data.content}</AlertTitle>
                  <AlertData>{FormatKoreanTime(data.created_At)}</AlertData>
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
      color: #285818;
      background-color: #e0ffd6;
    `}

  ${props =>
    props.status === '거절' &&
    css`
      color: #e02121;
      background-color: #ffe8e8;
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      color: #6d5517;
      background-color: #efecd9;
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
