import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import CategoryItems from 'components/common/CategoryItems';
import EquipmentShow from 'components/EquipmentManage/EquipmentShow';

import useSelectMenu from 'hooks/useSelectMenu';
import useResizeGetPageSize from 'hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentList } from 'redux/modules/equipmentStatus';
import useOutsideClick from 'hooks/useOutsideClick';

export default function EquipmentListContainer({
  category: { category, largeCategory },
  isAdmin,
  showModal,
  onClickDetail,
  onClickSingleModal,
  onClickMultiModal,
}) {
  const dispatch = useDispatch();
  const {
    equipmentStatus: { getEquipment, isEquipmentError },
    categoryData: { categoryIdData, categoryNameData },
  } = useSelector(state => state.equipmentStatus);

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState(categoryIdData);
  const [categoryTitle, setCategoryTitle] = useState(categoryNameData);
  const [categoryList, setCategoryList] = useState({
    show: false,
    list: category,
  });

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);
  const [resizeRef, pageSize, firstPageSize, handleResize] =
    useResizeGetPageSize();

  const categoryOutsideRef = useOutsideClick(
    () => setCategoryList(state => ({ ...state, show: false })),
    categoryList.show
  );

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
  }, [
    dispatch,
    keyword,
    categoryId,
    page,
    status,
    pageSize,
    handleResize,
    showModal,
  ]);

  useEffect(() => {
    if (getEquipment && getEquipment.content.length === 0) {
      setPage(state => (state > 1 ? state - 1 : 1));
    }
  }, [getEquipment]);

  const initEquipmentList = () => {
    setCategoryList({ show: false, list: categoryList.list });
    setCategoryId('');
    setPage(1);
    setKeyword('');
    setCategoryTitle('전체');
  };

  const handleClickMenu = e => {
    const name = e.target.innerText;
    const parseCategoryList = getCategoryList(name, category);
    clickMenu(e);

    if (name === '전체') {
      initEquipmentList();
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
    if (page !== 1) {
      setPage(1);
    }

    setKeyword(e.target.value);
  };

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
      <EquipmentListWrapper>
        <CategoryContainer>
          <CategoryItems
            getCategory={menuStyle}
            getSmallCategory={categoryList}
            categoryOutsideRef={categoryOutsideRef}
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
          onClickDetail={onClickDetail}
          onClickSingleModal={onClickSingleModal}
          onClickMultiModal={onClickMultiModal}
          resizeRef={resizeRef}
        />
      </EquipmentListWrapper>
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
