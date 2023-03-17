import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StatusMenu from '../../components/common/status/StatusMenu';
import RequestShow from '../../components/requestStatus/RequestShow';
import useSelectMenu from '../../hooks/useSelectMenu';
import { useDispatch, useSelector } from 'react-redux';
import { __requestStatus } from '../../redux/modules/requestStatus';
import useResizeGetPageSize from '../../hooks/useResizeGetPageSize';
import useSetStateChange from '../../hooks/useSetStateChange';

export default function RequestStatus() {
  const dispatch = useDispatch();
  const { getRequest, isStatusError } = useSelector(
    state => state.requestStatus.requestStatus
  );
  const [menuStyle, clickMenu, setSelectName, setSelectType] = useSelectMenu(
    [
      { name: '전체', type: 'ALL', status: true },
      { name: '비품 요청', type: 'SUPPLY', status: false },
      { name: '반납 요청', type: 'RETURN', status: false },
      { name: '수리 요청', type: 'REPAIR', status: false },
    ],
    'RequestStorgeKey'
  );
  const [page, setPage] = useState(1);
  const [type, setType] = useState(setSelectType());
  const [status, setStatus] = useState('ALL');

  const handleClickMenu = useSetStateChange(
    ['전체', '비품 요청', '반납 요청', '수리 요청'],
    ['ALL', 'SUPPLY', 'RETURN', 'REPAIR'],
    setType,
    e => {
      clickMenu(e);
      setPage(1);
    }
  );

  const handleChangeStatus = useSetStateChange(
    ['전체 보기', '처리전', '처리중', '처리 완료'],
    ['ALL', 'UNPROCESSED', 'PROCESSING', 'PROCESSED'],
    setStatus,
    e => {
      setStatus(e);
      setPage(1);
    }
  );
  const [
    containerRef,
    headerRef,
    containerHeaderRef,
    listHeaderRef,
    listRef,
    pageSize,
    handleResize,
  ] = useResizeGetPageSize();

  useEffect(() => {
    dispatch(
      __requestStatus({
        type,
        status,
        page,
        size: pageSize,
      })
    );
  }, [dispatch, page, type, status, pageSize]);

  const handlePage = e => {
    setPage(e);
  };

  return (
    <>
      {isStatusError && <div>에러 발생</div>}
      {getRequest && (
        <RequestStatusWrapper ref={containerRef}>
          <StatusMenu
            headerRef={headerRef}
            menuStyle={menuStyle}
            onClickMenu={handleClickMenu}
          />
          <RequestShow
            requestData={getRequest}
            setSelectName={setSelectName}
            page={page}
            pageSize={pageSize}
            onPage={handlePage}
            onChangeStatus={handleChangeStatus}
            containerHeaderRef={containerHeaderRef}
            listHeaderRef={listHeaderRef}
            listRef={listRef}
            onResize={handleResize}
          />
        </RequestStatusWrapper>
      )}
    </>
  );
}

const RequestStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
