import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';
import { v4 as uuidv4 } from 'uuid';
import { FormatKoreanTime } from '../../../utils/formatDate';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { getCookie } from '../../../utils/cookie';
import QUERY from '../../../constants/query';
import Storage from '../../../utils/localStorage';

export default function AlertStatus({ getDashboard }) {
  const [alarm, setAlarm] = useState(false);
  const token = getCookie(QUERY.COOKIE.COOKIE_NAME);
  const { notifications } = getDashboard.data;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let eventSource;
    try {
      eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_SERVER_URL}/api/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      eventSource.onmessage = async function (event) {
        const alarmData = event.data;
        const { userId } = Storage.getLocalStorageJSON(
          QUERY.STORAGE.LOCAL_NAME
        );
        console.log(userId);
        if (alarmData !== `EventStream Created. [userId=${userId}]`) {
          setAlarm(true);
        }
      };
    } catch (error) {
      if (eventSource) eventSource.close();
    }
  };

  return (
    <>
      {notifications && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
          <styleds.AlertAndAddContainer>
            {alarm && <LnbAlarmPoint />}
            {notifications.map(data => (
              <AlertListContainer key={uuidv4()}>
                <AlertImgContainer>
                  <AlertImg src={data.image} alt="" />
                </AlertImgContainer>
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
