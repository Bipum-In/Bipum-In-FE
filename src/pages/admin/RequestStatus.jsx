import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StatusMenu from 'components/common/status/StatusMenu';
import RequestShow from 'components/requestStatus/RequestShow';
import RequestModal from 'components/requestStatus/RequestModal';
import Modal from 'elements/Modal';

import useSelectMenu from 'hooks/useSelectMenu';
import useSetStateChange from 'hooks/useSetStateChange';
import useResizeGetPageSize from 'hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { initRequestData, __requestStatus } from 'redux/modules/requestStatus';
import { getEncryptionStorage } from '../../utils/encryptionStorage';

export default function RequestStatus() {
  const dispatch = useDispatch();
  const {
    requestStatus: { getRequest, isStatusError },
    requestData: { menu, menuType, selectStatus },
  } = useSelector(state => state.requestStatus);

  const [page, setPage] = useState(1);
  const [type, setType] = useState(menuType);
  const [status, setStatus] = useState(selectStatus);
  const [categoryTitle, setCategoryTitle] = useState('전체');
  const [keyword, setKeyword] = useState('');
  const [modal, setModal] = useState({ show: false, detailId: null });

  const editMenu = useRef(
    menu.map(item =>
      item.name === '보고서 결재' ? { ...item, name: '보고서 결재 요청' } : item
    )
  ).current;
  const [menuStyle, clickMenu] = useSelectMenu(editMenu);

  const [resizeRef, pageSize, firstPageSize, handleResize] =
    useResizeGetPageSize();

  const { isAdmin } = getEncryptionStorage();
  const path = isAdmin ? '/admin' : '';

  useEffect(() => {
    dispatch(initRequestData());
  }, [dispatch]);

  useEffect(() => {
    const size = pageSize || firstPageSize || handleResize();
    dispatch(__requestStatus({ path, keyword, type, status, page, size }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    keyword,
    page,
    type,
    status,
    pageSize,
    handleResize,
    modal.show,
  ]);

  const handleClickMenu = useSetStateChange(
    ['전체', '비품 요청', '반납 요청', '수리 요청', '보고서 결재 요청'],
    ['', 'SUPPLY', 'RETURN', 'REPAIR', 'REPORT'],
    setType,
    e => {
      clickMenu(e);
      setPage(1);
      setKeyword('');
      setCategoryTitle(e.target.innerText);
    }
  );

  const handleChangeState = e => {
    setStatus(e.target.value);
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const handleClickDetail = id => {
    setModal({ show: true, detailId: id });
  };

  const handlePage = e => {
    setPage(e);
  };

  return (
    <>
      {isStatusError && <div>에러 발생</div>}
      <RequestStatusWrapper ref={resizeRef.containerRef}>
        <StatusMenu
          headerRef={resizeRef.headerRef}
          menuStyle={menuStyle}
          onClickMenu={handleClickMenu}
        />
        <RequestShow
          isAdmin={isAdmin}
          requestData={getRequest}
          setSelectName={categoryTitle}
          page={page}
          pageSize={pageSize || firstPageSize}
          onPage={handlePage}
          status={status}
          setStatus={handleChangeState}
          keyword={keyword}
          setKeyword={handleChangeKeyword}
          onClickDetail={handleClickDetail}
          resizeRef={resizeRef}
        />
      </RequestStatusWrapper>
      <Modal isOpen={modal.show}>
        <RequestModal
          isClose={() => setModal({ ...modal, show: false })}
          detailId={modal.detailId}
          path={path}
          isAdmin={isAdmin}
        />
      </Modal>
    </>
  );
}

const RequestStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
