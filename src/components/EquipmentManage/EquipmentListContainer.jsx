import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import StatusMenu from '../../components/common/status/StatusMenu';
import EquipmentShow from '../../components/EquipmentManage/EquipmentShow';

import useSelectMenu from '../../hooks/useSelectMenu';
import useSetStateChange from '../../hooks/useSetStateChange';
import useResizeGetPageSize from '../../hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentList } from '../../redux/modules/equipmentStatus';

export default function EquipmentListContainer({ category }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [menuStyle, clickMenu, setSelectName, setSelectType] = useSelectMenu(
    category.largeCategory,
    'quipmentStorgeKey'
  );
  const [categoryId, setCategoryId] = useState('');

  const { getEquipment, isEquipmentError } = useSelector(
    state => state.equipmentStatus.equipmentStatus
  );
  console.log(getEquipment);
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
    dispatch(getEquipmentList({ keyword, categoryId, status, page, size }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, page, status, pageSize, handleResize]);

  const handleClickMenu = useSetStateChange(
    category.largeCategory.map(item => item.name),
    category.largeCategory.map(item => item.type),
    setCategoryId,
    e => {
      clickMenu(e);
      setPage(1);
    }
  );

  const handleChangeStatus = useSetStateChange(
    ['전체 보기', '사용중', '재고', '수리중'],
    ['ALL', 'USING', 'STOCK', 'REPAIRING'],
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
      {isEquipmentError && <div>에러 발생</div>}
      <RequestStatusWrapper ref={containerRef}>
        <StatusMenu
          headerRef={headerRef}
          menuStyle={menuStyle}
          onClickMenu={handleClickMenu}
        />
        <EquipmentShow
          requestData={getEquipment}
          setSelectName={setSelectName}
          page={page}
          pageSize={pageSize || firstPageSize}
          onPage={handlePage}
          onChangeStatus={handleChangeStatus}
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
