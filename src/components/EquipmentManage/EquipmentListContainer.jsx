import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import CategoryItems from '../../components/common/CategoryItems';
import EquipmentShow from '../../components/EquipmentManage/EquipmentShow';

import useSelectMenu from '../../hooks/useSelectMenu';
import useSetStateChange from '../../hooks/useSetStateChange';
import useResizeGetPageSize from '../../hooks/useResizeGetPageSize';

import { useDispatch, useSelector } from 'react-redux';
import { getEquipmentList } from '../../redux/modules/equipmentStatus';
import Modal from '../../elements/Modal';

export default function EquipmentListContainer({
  category: { category, largeCategory },
}) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('전체');
  const [categoryList, setCategoryList] = useState({ show: false, list: [] });

  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);
  const [resizeRef, pageSize, firstPageSize, handleResize] =
    useResizeGetPageSize();

  const { getEquipment, isEquipmentError } = useSelector(
    state => state.equipmentStatus.equipmentStatus
  );

  useEffect(() => {
    const size = pageSize || firstPageSize || handleResize();
    dispatch(getEquipmentList({ keyword, categoryId, status, page, size }));
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

  const handleClickDetail = id => {};

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
          requestData={getEquipment}
          setSelectName={categoryTitle}
          page={page}
          pageSize={pageSize || firstPageSize}
          onPage={handlePage}
          status={status}
          setStatus={setStatus}
          keyword={keyword}
          setKeyword={setKeyword}
          onClickDetail={handleClickDetail}
          resizeRef={resizeRef}
        />
      </EquipmentListWrapper>
      <Modal isOpen={false}>
        <EquipmentAddWrapper>모달</EquipmentAddWrapper>
      </Modal>
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

const EquipmentAddWrapper = styled.div`
  width: 80vw;
  height: 80vh;
  padding: 3rem;
`;
