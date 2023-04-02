import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import CategoryItems from 'components/common/CategoryItems';
import EquipmentShow from 'components/EquipmentManage/EquipmentShow';

import useSelectMenu from 'hooks/useSelectMenu';
import useResizeGetPageSize from 'hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentList } from 'redux/modules/equipmentStatus';
import EquipmentModal from './EquipmentModal';
import { getEncryptionStorage } from '../../utils/encryptionStorage';

export default function EquipmentListContainer({
  category: { category, largeCategory },
}) {
  const dispatch = useDispatch();
  const {
    equipmentStatus: { getEquipment, isEquipmentError },
    categoryData: { categoryIdData, categoryNameData },
  } = useSelector(state => state.equipmentStatus);

  const { isAdmin } = getEncryptionStorage();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState(categoryIdData);
  const [categoryTitle, setCategoryTitle] = useState(categoryNameData);
  const [showDetailModal, setShowDetailModal] = useState({
    show: false,
    id: null,
  });
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [showMultipleModal, setShowMultipleModal] = useState(false);
  const [categoryList, setCategoryList] = useState({
    show: false,
    list: [category],
  });

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);
  const [resizeRef, pageSize, firstPageSize, handleResize] =
    useResizeGetPageSize();

  useEffect(() => {
    const size = pageSize || firstPageSize || handleResize();
    dispatch(
      getEquipmentList({
        path: '/admin',
        keyword,
        categoryId,
        status,
        page,
        size,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, categoryId, page, status, pageSize, handleResize]);

  const handleClickMenu = e => {
    const name = e.target.innerText;
    const parseCategoryList = getCategoryList(name, category);
    clickMenu(e);

    if (name === '전체') {
      setCategoryList({ show: false, list: categoryList.list });
      setCategoryId('');
      setPage(1);
      setKeyword('');
      setCategoryTitle('전체');
      return;
    }
    setCategoryList({ show: true, list: parseCategoryList });
  };

  const handleClickCategory = e => {
    const name = e.target.innerText;
    const categoryId = getCategoryId(name, categoryList);

    setCategoryTitle(name);
    setCategoryId(categoryId);
    setPage(1);
    setKeyword('');
  };

  const handlePage = e => {
    setPage(e);
  };

  const handleChangeState = e => {
    setStatus(e.target.value);
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const handleDetailModal = id =>
    setShowDetailModal(state => ({ show: !state.show, id: id }));

  const handleSingleModal = () => setShowSingleModal(state => !state);

  const handleMultipleModal = () => setShowMultipleModal(state => !state);

  const getCategoryList = (name, categoryList) => {
    return categoryList.filter(list => list.largeCategory === name);
  };

  const getCategoryId = (name, categoryList) => {
    return categoryList.list.filter(item => item.categoryName === name)[0][
      'categoryId'
    ];
  };

  return (
    <>
      {isEquipmentError && <div>에러 발생</div>}
      <EquipmentListWrapper ref={resizeRef.containerRef}>
        <CategoryContainer ref={resizeRef.headerRef}>
          <CategoryItems
            getCategory={menuStyle}
            getSmallCategory={categoryList}
            onClickMenu={handleClickMenu}
            onClickCategory={handleClickCategory}
          />
        </CategoryContainer>
        <EquipmentShow
          isAdmin={isAdmin}
          requestData={getEquipment}
          setSelectName={categoryTitle}
          page={page}
          pageSize={pageSize || firstPageSize}
          onPage={handlePage}
          status={status}
          setStatus={handleChangeState}
          keyword={keyword}
          setKeyword={handleChangeKeyword}
          onClickDetail={handleDetailModal}
          onClickSingleModal={handleSingleModal}
          onClickMultiModal={handleMultipleModal}
          resizeRef={resizeRef}
        />
      </EquipmentListWrapper>
      <EquipmentModal
        isAdmin={isAdmin}
        showDetailModal={showDetailModal}
        showSingleModal={showSingleModal}
        handleDetailModal={handleDetailModal}
        handleSingleModal={handleSingleModal}
        category={category}
        largeCategory={largeCategory}
      />
    </>
  );
}

const EquipmentListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CategoryContainer = styled.div`
  position: relative;
  margin-bottom: 1.125rem;
`;
