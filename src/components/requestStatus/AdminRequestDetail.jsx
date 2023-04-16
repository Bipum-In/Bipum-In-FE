import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Axios from 'api/axios';

import ModalHeader from '../common/ModalHeader';
import Provide from './detail/Provide';
import UserInfo from './detail/UserInfo';
import UserContent from './detail/UserContent';
import ProcessButton from './detail/ProcessButton';
import CreatedAtFormatDate from './detail/CreatedAtFormatDate';

import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function RequestDetail({ isClose, detail }) {
  const {
    acceptResult,
    categoryId,
    requestId,
    requestType,
    requestStatus,
    categoryName,
    modelName,
    serialNum,
    content,
    imageList,
    userImage,
    deptName,
    empName,
    username,
    phoneNum,
    comment,
    createdAt,
    modifiedAt,
    useType,
  } = detail;

  const [stockList, setStockList] = useState({ data: null, check: false });
  const [declineComment, setDeclineComment] = useState('');

  const [disposeModal, setDisposeModal] = useModalState();
  const [repairModal, setRepairModal] = useModalState();

  const data = useRef({
    acceptResult: '',
    supplyId: '',
    comment: '',
  }).current;

  useEffect(() => {
    if (requestType === '비품 요청' && requestStatus === '처리전') {
      axios
        .get(`/api/supply/stock/${categoryId}`)
        .then(res => setStockList({ data: res.data.data, check: true }));
    } else {
      setStockList({ data: null, check: true });
    }
  }, [categoryId, requestStatus, requestType]);

  const handleChangeSelect = e => {
    const { value } = e.target;
    data.supplyId = value;
  };

  const handleAccept = () => {
    if (data.supplyId === 0 && requestType === '비품 요청') {
      alert('비품을 선택해주세요.');
      return;
    }

    data.acceptResult = 'ACCEPT';
    data.comment = declineComment;
    putRequest(data);
  };

  const handleDecline = () => {
    if (!declineComment) {
      alert('거절 사유를 입력해주세요.');
      return;
    }

    data.acceptResult = 'DECLINE';
    data.comment = declineComment;
    putRequest(data);
  };

  const handleDispose = () => {
    data.acceptResult = 'DISPOSE';
    putRequest(data);
  };

  const handleRepairComplete = () => {
    data.acceptResult = 'ACCEPT';
    putRequest(data);
  };

  const putRequest = data => {
    axios.put(`/api/admin/requests/${requestId}`, data).then(() => isClose());
  };

  const handleModalShow = () => setDisposeModal();
  const handleModalClose = () => setDisposeModal(false);
  const handleRepairModalShow = () => setRepairModal();
  const handleRepairClose = () => setRepairModal(false);
  return (
    <>
      {stockList.check && (
        <DetailContainer>
          <ModalHeader
            isClose={isClose}
            requestType={requestType}
            status={acceptResult}
          />
          <ContentContainer>
            <RequestContainer>
              <UserInfo
                empName={empName}
                deptName={deptName}
                username={username}
                userImage={userImage}
                phoneNum={phoneNum}
              />
              <UserContent
                useType={useType}
                content={content}
                serialNum={serialNum}
                modelName={modelName}
                requestType={requestType}
                categoryName={categoryName}
                requestStatus={requestStatus}
              />

              <Provide
                image={imageList}
                comment={comment}
                stockList={stockList.data}
                requestType={requestType}
                requestStatus={requestStatus}
                declineComment={declineComment}
                setDeclineComment={setDeclineComment}
                handleChangeSelect={handleChangeSelect}
              />
              <CreatedAtFormatDate
                createdAt={createdAt}
                modifiedAt={modifiedAt}
                requestStatus={requestStatus}
              />
            </RequestContainer>
          </ContentContainer>
          <CustomModal
            isOpen={disposeModal}
            onClose={handleModalClose}
            submit={handleDispose}
            text={'페기'}
          >
            비품을 폐기하시겠습니까?
          </CustomModal>
          <CustomModal
            isOpen={repairModal}
            onClose={handleRepairClose}
            submit={handleRepairComplete}
            text={'완료'}
          >
            수리가 완료된 비품입니까?
          </CustomModal>
          <ProcessButton
            declineComment={declineComment}
            requestType={requestType}
            requestStatus={requestStatus}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            handleModalShow={handleModalShow}
            handleRepairModalShow={handleRepairModalShow}
          />
        </DetailContainer>
      )}
    </>
  );
}

const DetailContainer = styled.main`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  padding-bottom: 1rem;
`;

const ContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 100%;
  max-height: 80vh;
`;

const RequestContainer = styled.div`
  ${props => props.theme.FlexCow};
  align-items: center;
  width: 100%;
  max-height: calc(90vh);
  padding: 1.875rem 3.9375rem;
  font-weight: 600;
  overflow-x: hidden;
  overflow-y: auto;
`;
