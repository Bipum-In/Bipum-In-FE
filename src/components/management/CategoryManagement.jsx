import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import STRING from 'constants/string';
import useSelectMenu from 'hooks/useSelectMenu';
import ManageCategory from './category/ManageCategory';
import Axios from 'api/axios';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function CategoryManagement({
  category: { category, largeCategory },
}) {
  const {
    categoryData: { categoryIdData, categoryNameData },
  } = useSelector(state => state.equipmentStatus);

  const [categoryId, setCategoryId] = useState(categoryIdData);
  const [categoryTitle, setCategoryTitle] = useState(categoryNameData);
  const [activeCategory, setActiveCategory] = useState(
    STRING.CATEGORY_ENG.COMPUTER
  );
  const [menuStyle, clickMenu] = useSelectMenu(largeCategory);
  const [categoryList, setCategoryList] = useState({
    show: false,
    list: [category],
  });

  useEffect(() => {
    const parseCategoryList = getCategoryList(activeCategory, category);
    setCategoryList({ show: true, list: parseCategoryList });
  }, [category, activeCategory]);

  const handleClickMenu = e => {
    const name = e.target.innerText;
    const parseCategoryList = getCategoryList(name, category);
    clickMenu(e);
    setActiveCategory(name);
    setCategoryList({ show: true, list: parseCategoryList });
  };

  const getCategoryList = (name, categoryList) => {
    return categoryList.filter(list => list.largeCategory === name);
  };

  const handleDeleteCategory = categoryId => {
    axios.delete(`/api/category/${categoryId}`).then(response => {
      const filteredList = categoryList.list.filter(
        item => item.categoryId !== categoryId
      );
      setCategoryList({ show: true, list: filteredList });
    });
  };

  return (
    <CategoryManagementWarpper>
      <ManagementType>
        <Title>{STRING.MANAGEMENT_TITLE.CATEGORY}</Title>
      </ManagementType>
      <ManageCategory
        activeCategory={activeCategory}
        getCategory={menuStyle}
        getSmallCategory={categoryList}
        onClickMenu={handleClickMenu}
        handleDeleteCategory={handleDeleteCategory}
      />
    </CategoryManagementWarpper>
  );
}

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin-left: 2.5rem;
`;

const ManagementType = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  width: 100%;
  height: 5.625rem;
  justify-content: space-between;
`;

const CategoryManagementWarpper = styled.div`
  ${props => props.theme.wh100};
  position: relative;
  overflow: hidden;
`;
