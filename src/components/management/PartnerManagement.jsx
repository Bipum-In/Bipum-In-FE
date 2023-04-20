import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatusList from '../common/status/StatusList';
import PaginationList from '../common/PaginationList';
import Modal from 'elements/Modal';
import DetailPartner from './partner/DetailPartner';
import STRING from 'constants/string';
import { useDispatch, useSelector } from 'react-redux';
import { getPartnersList } from 'redux/modules/partnersList';
import StatusListHeader from 'components/common/status/StatusListHeader';

import { useModalState } from 'hooks/useModalState';
import PartnerAddBtn from './partner/PartnerAddBtn';
import PLACEHOLDER from 'constants/placeholder';
import useResizeGetPageSize from 'hooks/useResizeGetPageSize';

export default function PartnerManagement() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState();
  const [modal, setModal] = useState({ show: false, detailId: null });
  const [addPatnerModal, setAddPatnerModal] = useModalState();
  const { getPartners } = useSelector(state => state.partnersList);

  const headerList = [
    { name: '업체명', width: '5rem' },
    { name: '전화번호', width: '6.375rem' },
    { name: '이메일', width: '12rem' },
    { name: '주소', width: '19.375rem' },
  ];

  const [resizeRef, pageSize, firstPageSize, handleResize] =
    useResizeGetPageSize();

  useEffect(() => {
    const size = pageSize || firstPageSize || handleResize();
    dispatch(getPartnersList({ page, size, keyword }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, pageSize, handleResize, keyword]);

  useEffect(() => {
    if (getPartners && getPartners.content.length === 0) {
      setPage(state => (state > 1 ? state - 1 : 1));
    }
  }, [getPartners]);

  const contentKeyArr = ['partnersName', 'phone', 'email', 'address'];

  const handlePage = e => {
    setPage(e);
  };

  const handleChangeDetail = id => {
    setModal(state => ({ show: !state.show, detailId: id }));
    const result = getPartners.content.find(item => item.partnersId === id);
    setResult(result);
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const handleModalClose = () => setAddPatnerModal(false);

  return (
    <>
      <PartnerWarpper ref={resizeRef.containerRef}>
        <ManagementType>
          <StatusListHeader
            setSelectName={STRING.MANAGEMENT_TITLE.PARTNER}
            containerHeaderRef={resizeRef.containerHeaderRef}
            keyword={keyword}
            setKeyword={handleChangeKeyword}
            placeholder={PLACEHOLDER.ENTER_INPUT('검색어를', '(업체 등)')}
            childTwo={
              <PartnerAddBtn
                addPatnerModal={addPatnerModal}
                setAddPatnerModal={setAddPatnerModal}
                handleModalClose={handleModalClose}
              />
            }
          />
          <StatusList
            listHeaderRef={resizeRef.listHeaderRef}
            listRef={resizeRef.listRef}
            headerList={headerList}
            content={getPartners}
            contentKeyArr={contentKeyArr}
            onDetail={handleChangeDetail}
          />
          {getPartners?.content.length !== 0 && (
            <PaginationList
              page={page}
              pageSize={pageSize || firstPageSize}
              requestData={getPartners || { totalElements: 0 }}
              onPage={handlePage}
            />
          )}
        </ManagementType>
      </PartnerWarpper>
      <Modal isOpen={modal.show} onClose={handleChangeDetail}>
        <DetailPartner
          isClose={handleChangeDetail}
          result={result}
          page={page}
        />
      </Modal>
    </>
  );
}

const ManagementType = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PartnerWarpper = styled.div`
  ${props => props.theme.wh100};
  display: flex;
  overflow: hidden;
  position: relative;
`;
