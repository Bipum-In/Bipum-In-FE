import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { requestDetail } from '../../redux/modules/requestStatus';

export default function RequestDetail({ detailId }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailLoading, isDetailError } = useSelector(
    state => state.requestStatus.requestDetail
  );

  useEffect(() => {
    dispatch(requestDetail(detailId));
  }, [detailId, dispatch]);

  return <RequestDetailWrapper></RequestDetailWrapper>;
}
const RequestDetailWrapper = styled.div`
  width: 70vw;
  height: 70vh;
  padding: 3rem;
`;
