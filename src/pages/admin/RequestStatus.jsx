import Axios from '../../api/axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import RequestMenu from '../../components/requestStatus/RequestMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { __requestStatus } from '../../redux/modules/requestStatus';

export default function RequestStatus() {
  const dispatch = useDispatch();
  const { getRequest, isStatusLoading, isStatusError } = useSelector(
    state => state.requestStatus.requestStatus
  );
  const [menuStyle, handleClickMenu, setSelectName] = useSelectMenu(
    [
      { name: '전체', status: true },
      { name: '비품 요청', status: false },
      { name: '반납 요청', status: false },
      { name: '수리 요청', status: false },
    ],
    'RequestStorgeKey'
  );

  useEffect(() => {
    dispatch(__requestStatus({ status: 'UNPROCESSED', page: 1 }));
  }, [dispatch]);

  return (
    <RequestStatusWrapper>
      {isStatusLoading && <div>로딩중</div>}
      {isStatusError && <div>에러 발생</div>}
      {getRequest && (
        <>
          <RequestMenu menuStyle={menuStyle} onClickMenu={handleClickMenu} />
          <RequestShow requestData={getRequest} setSelectName={setSelectName} />
        </>
      )}
    </RequestStatusWrapper>
  );
}

const RequestStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.blue.brandColor1};
  padding: 2.25rem 3.25rem 3.25rem 3.25rem;
`;
