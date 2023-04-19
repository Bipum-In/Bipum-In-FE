import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import CategoryItems from '../common/CategoryItems';
import StockViewShow from './StockViewShow';
import useSelectMenu from 'hooks/useSelectMenu';
import EquipmentModal from '../EquipmentManage/EquipmentModal';

import { getEquipmentList } from 'redux/modules/equipmentStatus';
import { getEncryptionStorage } from '../../utils/encryptionStorage';
import useOutsideClick from 'hooks/useOutsideClick';

export default function StockView({ category: { category, largeCategory } }) {
  const dispatch = useDispatch();
  const {
    equipmentStatus: { getEquipment, isEquipmentError },
    categoryData: { categoryIdData, categoryNameData },
  } = useSelector(state => state.equipmentStatus);

  const { isAdmin } = getEncryptionStorage();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState(categoryIdData);
  const [categoryTitle, setCategoryTitle] = useState(categoryNameData);
  const [showDetailModal, setShowDetailModal] = useState({
    detailShow: false,
    id: null,
  });
  const [categoryList, setCategoryList] = useState({
    show: false,
    list: category,
  });
  const pageRef = useRef();

  const categoryOutsideRef = useOutsideClick(
    () => setCategoryList(state => ({ ...state, show: false })),
    categoryList.show
  );

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);

  useEffect(() => {
    dispatch(
      getEquipmentList({
        path: '',
        keyword,
        categoryId,
        status: '',
        page,
        size: 16,
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
    pageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangeKeyword = e => {
    setKeyword(e.target.value);

    if (page !== 1) {
      setPage(1);
    }
  };

  const handleDetailModal = id => {
    setShowDetailModal(state => ({ detailShow: !state.detailShow, id: id }));
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
      {getEquipment && (
        <>
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
            <StockViewShow
              pageRef={pageRef}
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
            isAdmin={isAdmin}
            showModal={showDetailModal}
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
