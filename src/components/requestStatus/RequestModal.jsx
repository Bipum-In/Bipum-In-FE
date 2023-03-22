import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { initDetail, requestDetail } from '../../redux/modules/requestStatus';
import RequestDetail from './RequestDetail';

export default function RequestModal({ isClose, detailId }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailLoading, isDetailError } = useSelector(
    state => state.requestStatus.requestDetail
  );

  useEffect(() => {
    dispatch(initDetail());
    dispatch(requestDetail(detailId));
  }, [detailId, dispatch]);

  return (
    <RequestModalWrapper>
      {isDetailLoading && <div>로딩중</div>}
      {isDetailError && <div>에러</div>}
      {getDetail && <RequestDetail isClose={isClose} detail={getDetail} />}
    </RequestModalWrapper>
  );
}
const RequestModalWrapper = styled.div`
  width: 70vw;
  height: 70vh;
  padding: 3rem;
`;
