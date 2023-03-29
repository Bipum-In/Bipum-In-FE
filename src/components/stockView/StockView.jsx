import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import CategoryItems from '../common/CategoryItems';
import EquipmentShow from '../EquipmentManage/EquipmentShow';

import useSelectMenu from '../../hooks/useSelectMenu';

import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentList } from '../../redux/modules/equipmentStatus';
import EquipmentModal from '../EquipmentManage/EquipmentModal';
import StockViewShow from './StockViewShow';

export default function StockView({ category: { category, largeCategory } }) {
  const dispatch = useDispatch();
  const {
    equipmentStatus: { getEquipment, isEquipmentError },
    categoryData: { categoryIdData, categoryNameData },
  } = useSelector(state => state.equipmentStatus);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState(categoryIdData);
  const [categoryTitle, setCategoryTitle] = useState(categoryNameData);
  const [showDetailModal, setShowDetailModal] = useState({
    show: false,
    id: null,
  });

  const [categoryList, setCategoryList] = useState({
    show: false,
    list: [category],
  });

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);

  useEffect(() => {
    dispatch(
      getEquipmentList({
        path: '',
        keyword,
        categoryId,
        status: '',
        page,
        size: 12,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, categoryId, page]);

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

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);
  };

  const handleDetailModal = id =>
    setShowDetailModal(state => ({ show: !state.show, id: id }));

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
      {getEquipment && (
        <>
          <EquipmentListWrapper>
            <CategoryContainer>
              <CategoryItems
                getCategory={menuStyle}
                getSmallCategory={categoryList}
                onClickMenu={handleClickMenu}
                onClickCategory={handleClickCategory}
              />
            </CategoryContainer>
            <StockViewShow
              requestData={getEquipment}
              setSelectName={categoryTitle}
              page={page}
              onPage={handlePage}
              keyword={keyword}
              setKeyword={handleChangeKeyword}
              onClickDetail={handleDetailModal}
            />
          </EquipmentListWrapper>
          <EquipmentModal
            showDetailModal={showDetailModal}
            handleDetailModal={handleDetailModal}
            category={category}
            largeCategory={largeCategory}
          />
        </>
      )}
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
