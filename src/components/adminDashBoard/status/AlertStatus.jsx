import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled, { css } from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';
import Modal from 'elements/Modal';
import RequestModal from 'components/requestStatus/RequestModal';

import { formatAgo } from 'utils/formatDate';
import EmptyAlarm from './EmptyAlarm';
import STRING from 'constants/string';
import NUMBER from 'constants/number';

import { useInView } from 'react-intersection-observer';
import { __adminSseAlert } from 'redux/modules/sseAlertList';
import { __userSseAlert } from 'redux/modules/sseAlertList';
import Axios from 'api/axios';
import {
  deleteAdminAlertData,
  deleteUserAlertData,
} from 'redux/modules/sseAlertList';
import { deleteAdminSseData, deleteUserSseData } from 'redux/modules/sseSlice';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function AlertStatus({ isAdmin }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({ show: false, detailId: null });
  const path = isAdmin ? '/admin' : '';

  const {
    adminSseAlert: { getAdminSseAlert, isAdminSseAlertError },
    userSseAlert: { getUserSseAlert, isUserSseAlertError },
  } = useSelector(state => state.sseAlertList);

  const content = isAdmin
    ? getAdminSseAlert?.content
    : getUserSseAlert?.content;
  const isLastPage = isAdmin
    ? getAdminSseAlert?.lastPage
    : getUserSseAlert?.lastPage;

  const { sseAdminData, sseUserData } = useSelector(state => state.sseSlice);

  const sseData = isAdmin ? sseAdminData : sseUserData;
  const [ref, inView] = useInView({ threshold: 0 }); //inView
  const page = useRef(1);
  const size = NUMBER.INT.FIVE;

  useEffect(() => {
    if (!isLastPage && inView) {
      isAdmin
        ? dispatch(__adminSseAlert({ page: page.current, size }))
        : dispatch(__userSseAlert({ page: page.current, size }));
      page.current += 1;
    }
  }, [dispatch, page, size, inView, isLastPage, isAdmin]);

  const putRequest = (notificationId, requestId) => {
    axios.put(`/api/main/read/${notificationId}`).then(() => {
      if (isAdmin) {
        dispatch(deleteAdminAlertData(notificationId));
        dispatch(deleteAdminSseData(notificationId));
      } else {
        dispatch(deleteUserAlertData(notificationId));
        dispatch(deleteUserSseData(notificationId));
      }
    });
    setModal({ show: true, detailId: requestId });
  };

  return (
    <>
      {content && (
        <styleds.EquipmentTopContainer col="true">
          <AnchorBtn onClick={() => {}}>알림</AnchorBtn>
          <styleds.AlertAndAddContainer>
            {sseData.length === 0 && content.length === 0 && isLastPage && (
              <EmptyAlarm />
            )}
            {[...sseData, ...content].map((data, index) => (
              <AlertListContainer
                AlertListContainer
                key={index}
                defaultValue={data.request_id}
                onClick={() =>
                  putRequest(
                    data.notification_id || data.notificationId,
                    data.request_id || data.requestId
                  )
                }
              >
                {isAdmin ? (
                  <AlertImgContainer>
                    <AlertImg src={data.image} alt="" />
                  </AlertImgContainer>
                ) : (
                  <AlertStatusContainer>
                    <Status
                      status={
                        STRING.REQUEST_STATUS[
                          data.accept_result || data.acceptResult
                        ]
                      }
                    >
                      {
                        STRING.REQUEST_STATUS[
                          data.accept_result || data.acceptResult
                        ]
                      }
                    </Status>
                  </AlertStatusContainer>
                )}
                <AlertDetailContainer>
                  <AlertTitle>{data.content}</AlertTitle>
                  <AlertData>{formatAgo(data.created_At)}</AlertData>
                </AlertDetailContainer>
              </AlertListContainer>
            ))}
            {content && (
              <InfinityContainer ref={ref}>
                {isLastPage && content.length > 4 && (
                  <span>마지막 페이지 입니다.</span>
                )}
              </InfinityContainer>
            )}
          </styleds.AlertAndAddContainer>
        </styleds.EquipmentTopContainer>
      )}
      {/* 알림 요청현황 모달 */}
      <Modal
        isOpen={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
      >
        <RequestModal
          isClose={() => setModal({ ...modal, show: false })}
          detailId={modal.detailId}
          isAdmin={isAdmin}
          path={path}
        />
      </Modal>
    </>
  );
}

const AlertListContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 1rem;
  min-height: 4.625rem;
  padding: 0 1.5625rem;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
  transition: background 0.1s ease-in-out;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.color.blue.brandColor2};
  }
  &:first-child {
    margin-top: -1.25rem;
    padding-top: 1rem;
    min-height: 6rem;
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
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
`;

const AlertTitle = styled.span`
  font-size: 0.875rem;
`;
const AlertData = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.color.grey.brandColor5};
`;

const InfinityContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 100%;
  span {
    color: ${props => props.theme.color.grey.brandColor5};
    padding: 1rem;
  }
`;
