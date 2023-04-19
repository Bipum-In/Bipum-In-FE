import React, { memo, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled, { css } from 'styled-components';
import { styleds } from './AdminDashBaordStyled';
import AnchorBtn from '../AnchorBtn';
import Modal from 'elements/Modal';
import alertModal from 'utils/alertModal';

import defaultLogo from 'styles/commonIcon/defaultLogo.svg';
import RequestModal from 'components/requestStatus/RequestModal';

import { formatAgo } from 'utils/formatDate';
import EmptyAlarm from './EmptyAlarm';
import STRING from 'constants/string';

import { useInView } from 'react-intersection-observer';
import { __adminSseAlert } from 'redux/modules/sseAlertList';
import { __userSseAlert } from 'redux/modules/sseAlertList';
import { api } from 'api/axios';
import {
  deleteAdminAlertData,
  deleteUserAlertData,
  deleteAllUerMsg,
  deleteAllAdminMsg,
} from 'redux/modules/sseAlertList';
import {
  deleteAdminSseData,
  deleteUserSseData,
  deleteAllUerSseMsg,
  deleteAllAdminSseMsg,
} from 'redux/modules/sseAlertList';

export default memo(function AlertStatus({ isAdmin }) {
  const dispatch = useDispatch();
  const [isDeleteShow, setDeleteToggle] = useState(false);
  const [modal, setModal] = useState({ show: false, detailId: null });
  const path = isAdmin ? '/admin' : '';

  const {
    adminSseAlert: { getAdminSseAlert },
    userSseAlert: { getUserSseAlert },
    sseDatas: { sseAdminData, sseUserData },
  } = useSelector(state => state.sseAlertList);

  const concatAlertData = () => {
    if (isAdmin) {
      return [...sseAdminData, ...getAdminSseAlert?.content];
    }
    return [...sseUserData, ...getUserSseAlert?.content];
  };

  const isLastPage = isAdmin
    ? getAdminSseAlert?.lastPage
    : getUserSseAlert?.lastPage;
  const [ref, inView] = useInView({ threshold: 0 }); //inView
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLastPage && inView) {
      isAdmin
        ? dispatch(__adminSseAlert({ page, size: 5 }))
        : dispatch(__userSseAlert({ page, size: 5 }));
      setPage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, inView, isAdmin]);

  const allDeleteAlarm = () => {
    setDeleteToggle(prev => !prev);
    api
      .delete(`/api/notification?role=${STRING.IS_ADMIN(isAdmin)}`)
      .then(() => {
        if (concatAlertData().lenght) {
          alertModal(false, '모든 알림이 삭제되었습니다.', 2);
        }
        if (isAdmin) {
          dispatch(deleteAllAdminMsg());
          dispatch(deleteAllAdminSseMsg());
        } else {
          dispatch(deleteAllUerMsg());
          dispatch(deleteAllUerSseMsg());
        }
      });
  };

  const putRequest = (notificationId, requestId) => {
    api.put(`/api/main/read/${notificationId}`).then(() => {
      setModal({ show: true, detailId: requestId });
    });

    if (isAdmin) {
      dispatch(deleteAdminAlertData(notificationId));
      dispatch(deleteAdminSseData(notificationId));
    } else {
      dispatch(deleteUserAlertData(notificationId));
      dispatch(deleteUserSseData(notificationId));
    }
  };

  return (
    <AlertStatusWrapper>
      <styleds.EquipmentTopContainer col="true">
        <AnchorContainer>
          <AnchorBtn
            isAlert={true}
            allDeleteAlarm={allDeleteAlarm}
            isDeleteShow={isDeleteShow}
            setDeleteToggle={setDeleteToggle}
          >
            알림
          </AnchorBtn>
        </AnchorContainer>
        <styleds.AlertAndAddContainer>
          {concatAlertData().length === 0 && isLastPage && <EmptyAlarm />}
          {concatAlertData().map((data, index) => {
            return (
              <AlertListContainer
                AlertListContainer
                key={index}
                defaultValue={data.requestId}
                onClick={() =>
                  putRequest(
                    data.notificationId || data.getNotificationId,
                    data.requestId || data.getRequestId
                  )
                }
              >
                {isAdmin ? (
                  <AlertImgContainer>
                    {data.image || data.getImage ? (
                      <AlertImg
                        src={data.image || data.getImage}
                        alt="alertImg"
                      />
                    ) : (
                      <AlertImg src={defaultLogo} alt="defaultImg" />
                    )}
                  </AlertImgContainer>
                ) : (
                  <AlertStatusContainer>
                    <Status
                      status={
                        STRING.REQUEST_STATUS[
                          data.acceptResult || data.getAcceptresult
                        ]
                      }
                    >
                      {
                        STRING.REQUEST_STATUS[
                          data.acceptResult || data.getAcceptresult
                        ]
                      }
                    </Status>
                  </AlertStatusContainer>
                )}
                <AlertDetailContainer>
                  <AlertTitle>{data.content || data.getContent}</AlertTitle>
                  <AlertData>
                    {formatAgo(data.createdAt || data.getCreated_At)}
                  </AlertData>
                </AlertDetailContainer>
              </AlertListContainer>
            );
          })}
          <InfinityContainer ref={ref}>
            {isLastPage && concatAlertData().length > 4 && (
              <span>마지막 페이지 입니다.</span>
            )}
          </InfinityContainer>
        </styleds.AlertAndAddContainer>
      </styleds.EquipmentTopContainer>
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
    </AlertStatusWrapper>
  );
});

const AlertStatusWrapper = styled.article`
  width: 100%;
  height: 100%;
`;

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

const AnchorContainer = styled.article``;

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
  height: 3.75rem;
  span {
    color: ${props => props.theme.color.grey.brandColor5};
    padding: 1rem;
  }
`;
