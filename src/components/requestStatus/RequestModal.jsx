import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { initDetail, requestDetail } from 'redux/modules/requestStatus';

const AdminRequestDetail = lazy(() => import('./AdminRequestDetail'));
const UserRequestDetail = lazy(() => import('./UserRequestDetail'));

export default function RequestModal({ isClose, detailId, path, isAdmin }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailError } = useSelector(
    state => state.requestStatus.requestDetail
  );

  useEffect(() => {
    dispatch(initDetail());
    dispatch(requestDetail({ path, detailId }));
  }, [path, detailId, dispatch]);

  useEffect(() => {
    if (isDetailError) {
      isClose();
    }
  }, [isDetailError]);

  return (
    <RequestModalWrapper>
      <Suspense fallback={null}>
        {/* {isDetailError && <div>에러</div>} */}
        {getDetail && isAdmin && !isDetailError && (
          <AdminRequestDetail isClose={isClose} detail={getDetail} />
        )}
        {getDetail && !isAdmin && !isDetailError && (
          <UserRequestDetail isClose={isClose} detail={getDetail} />
        )}
      </Suspense>
    </RequestModalWrapper>
  );
}
const RequestModalWrapper = styled.div`
  width: 35.625rem;
  height: 100%;
`;
