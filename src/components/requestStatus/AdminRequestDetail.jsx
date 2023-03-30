import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Axios from '../../api/axios';

import ModalHeader from '../common/ModalHeader';
import Provide from './detail/Provide';
import UserInfo from './detail/UserInfo';
import UserContent from './detail/UserContent';
import ProcessButton from './detail/ProcessButton';
import CreatedAtFormatDate from './detail/CreatedAtFormatDate';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function RequestDetail({ isClose, detail, isAdmin }) {
  const {
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
    comment,
    createdAt,
    modifiedAt,
  } = detail;

  const [stockList, setStockList] = useState({ data: null, check: false });
  const [declineComment, setDeclineComment] = useState('');
  const data = useRef({
    acceptResult: '',
    supplyId: 0,
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
    console.log(data);
  };

  const handleAccept = () => {
    if (data.supplyId === 0 && requestType === '비품 요청') {
      alert('비품을 선택해주세요.');
      return;
    }

    data.acceptResult = 'ACCEPT';
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

  return (
    <>
      {stockList.check && (
        <DetailContainer>
          <ModalHeader isClose={isClose} requestType={requestType} />
          <ContentContainer>
            <RequestContainer>
              <UserInfo
                empName={empName}
                deptName={deptName}
                username={username}
                userImage={userImage}
              />
              <UserContent
                content={content}
                serialNum={serialNum}
                modelName={modelName}
                requestType={requestType}
                categoryName={categoryName}
                requestStatus={requestStatus}
              />
            </RequestContainer>
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
          </ContentContainer>
          <ProcessButton
            requestType={requestType}
            requestStatus={requestStatus}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            handleDispose={handleDispose}
            handleRepairComplete={handleRepairComplete}
          />
          <CreatedAtFormatDate
            createdAt={createdAt}
            modifiedAt={modifiedAt}
            requestStatus={requestStatus}
          />
        </DetailContainer>
      )}
    </>
  );
}

const DetailContainer = styled.main`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  margin-bottom: 1.875rem;
`;

const ContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 100%;
  padding: 1.875rem 3.9375rem;
`;

const RequestContainer = styled.div`
  ${props => props.theme.FlexCow};
  align-items: center;
  width: 100%;
  font-weight: 600;
`;
