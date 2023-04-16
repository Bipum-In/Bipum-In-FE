import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PartnerHeader from './partner/PartnerHeader';
import StatusList from '../common/status/StatusList';
import PaginationList from '../common/PaginationList';
import Modal from 'elements/Modal';
import DetailPartner from './partner/DetailPartner';
import STRING from 'constants/string';

export default function PartnerManagement({ partners, page, onPage }) {
  const headerList = [
    { name: '업체명', width: '5rem' },
    { name: '전화번호', width: '6.375rem' },
    { name: '이메일', width: '12rem' },
    { name: '주소', width: '19.375rem' },
  ];

  const [modal, setModal] = useState({ show: false, detailId: null });
  const [ManagementTitle] = useState(STRING.MANAGEMENT_TITLE.PARTNER);
  const [keyword, setKeyword] = useState('');

  const [result, setResult] = useState();

  const contentKeyArr = ['partnersName', 'phone', 'email', 'address'];

  const handleChangeDetail = id => {
    setModal(state => ({ show: !state.show, detailId: id }));
    const result = partners.content.find(item => item.partnersId === id);
    setResult(result);
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const searchResult = {
    content: partners.content.filter(
      item =>
        item.partnersName.includes(keyword) ||
        item.phone.includes(keyword) ||
        item.email.includes(keyword) ||
        item.address.includes(keyword)
    ),
    totalPages: partners.totalPages,
  };

  return (
    <>
      <PartnerWarpper>
        <ManagementType>
          <PartnerHeader
            setSelectName={ManagementTitle}
            keyword={keyword}
            setKeyword={handleChangeKeyword}
          />
          <StatusList
            headerList={headerList}
            content={keyword ? searchResult : partners}
            contentKeyArr={contentKeyArr}
            onDetail={handleChangeDetail}
          />
          <PaginationList
            page={page}
            pageSize={10}
            requestData={partners}
            onPage={onPage}
          />
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
