import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { initDetail, requestDetail } from 'redux/modules/requestStatus';
import AdminRequestDetail from './AdminRequestDetail';
import UserRequestDetail from './UserRequestDetail';

export default function RequestModal({ isClose, detailId, path, isAdmin }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailError } = useSelector(
    state => state.requestStatus.requestDetail
  );

  useEffect(() => {
    dispatch(initDetail());
    dispatch(requestDetail({ path, detailId }));
  }, [path, detailId, dispatch]);

  return (
    <RequestModalWrapper>
      {isDetailError && <div>에러</div>}
      {getDetail && isAdmin && (
        <AdminRequestDetail isClose={isClose} detail={getDetail} />
      )}
      {getDetail && !isAdmin && (
        <UserRequestDetail isClose={isClose} detail={getDetail} />
      )}
    </RequestModalWrapper>
  );
}
const RequestModalWrapper = styled.div`
  width: 35.625rem;
  height: 100%;
`;
