import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import StatusMenu from '../../components/common/status/StatusMenu';
import RequestShow from '../../components/requestStatus/RequestShow';

import useSelectMenu from '../../hooks/useSelectMenu';
import useSetStateChange from '../../hooks/useSetStateChange';
import useResizeGetPageSize from '../../hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { __requestStatus } from '../../redux/modules/requestStatus';

const menuData = [
  { name: '전체', type: 'ALL', status: true },
  { name: '비품 요청', type: 'SUPPLY', status: false },
  { name: '반납 요청', type: 'RETURN', status: false },
  { name: '수리 요청', type: 'REPAIR', status: false },
];

export default function RequestStatus() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const searchRef = useRef();

  const [menuStyle, clickMenu, setSelectName] = useSelectMenu(menuData);
  const { getRequest, isStatusError } = useSelector(
    state => state.requestStatus.requestStatus
  );

  const [
    containerRef,
    headerRef,
    containerHeaderRef,
    listHeaderRef,
    listRef,
    pageSize,
    firstPageSize,
    handleResize,
  ] = useResizeGetPageSize();

  useEffect(() => {
    const size = pageSize || firstPageSize || handleResize();
    dispatch(__requestStatus({ keyword, type, status, page, size }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, page, type, status, pageSize, handleResize]);

  const onSubmit = e => {
    e.preventDefault();
    const keyword = searchRef.current.value;
    setKeyword(keyword);
  };

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

  const handlePage = e => {
    setPage(e);
  };

  return (
    <>
      {isStatusError && <div>에러 발생</div>}
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
          pageSize={pageSize || firstPageSize}
          onPage={handlePage}
          onChangeStatus={handleChangeStatus}
          searchRef={searchRef}
          onSubmit={onSubmit}
          containerHeaderRef={containerHeaderRef}
          listHeaderRef={listHeaderRef}
          listRef={listRef}
          onResize={handleResize}
        />
      </RequestStatusWrapper>
    </>
  );
}

const RequestStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
