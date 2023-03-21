import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import StatusMenu from '../../components/common/status/StatusMenu';
import CategoryItems from '../../components/common/CategoryItems';
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
  const [categoryId, setCategoryId] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [showCategoryList, setShowCategoryList] = useState(false);

  const [menuStyle, clickMenu, setSelectName] = useSelectMenu(
    category.largeCategory
  );

  const { getEquipment, isEquipmentError } = useSelector(
    state => state.equipmentStatus.equipmentStatus
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
    dispatch(getEquipmentList({ keyword, categoryId, status, page, size }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, categoryId, page, status, pageSize, handleResize]);

  const handleClickMenu = e => {
    clickMenu(e);

    const name = e.target.innerText;
    if (name === '전체') {
      setShowCategoryList(false);
      return;
    }

    const categoryList = getCategoryList(name, category.category);
    setCategoryList(categoryList);
    setShowCategoryList(true);
  };

  const getCategoryList = (name, categoryList) => {
    return categoryList.filter(list => list.largeCategory === name);
  };

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
        <CategoryContainer ref={headerRef}>
          <CategoryItems
            getCategory={menuStyle}
            onClickMenu={handleClickMenu}
          />
        </CategoryContainer>
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

const CategoryContainer = styled.div`
  margin-bottom: 1.125rem;
`;
