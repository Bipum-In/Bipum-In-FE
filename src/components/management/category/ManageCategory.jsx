import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import STRING from 'constants/string';
import Button from 'elements/Button';
import Input from 'elements/Input';
import { ReactComponent as Add } from 'styles/commonIcon/add.svg';
import { ReactComponent as Trash } from 'styles/commonIcon/trash.svg';
import { ReactComponent as Edit } from 'styles/commonIcon/edit.svg';
import { ReactComponent as Save } from 'styles/commonIcon/save.svg';
import { ReactComponent as CancelInput } from 'styles/commonIcon/cancelInput.svg';

import { CustomModal } from 'elements/Modal';
import { useModalState } from 'hooks/useModalState';
import Axios from 'api/axios';
import {
  setSmallCategoryData,
  editCategoryData,
} from 'redux/modules/equipmentStatus';
// import CategorySidebar from './CategorySidebar';
import ManageSidebar from './ManageSidebar';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function ManageCategory({
  activeCategory,
  getSmallCategory,
  onClickMenu,
  handleDeleteCategory,
}) {
  const largetCategoryList = Object.values(STRING.CATEGORY_ENG).map(
    category => ({ name: category })
  );

  const [idModalCategory, setIdModalCategory] = useState(null);
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useModalState();
  const [deleteModal, setDeleteModal] = useModalState();
  const handleInputClear = () => setEditingCategoryName('');
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [prevCategory, setPrevCategory] = useState('');

  const handleEditClick = item => {
    setEditingCategoryId(item.categoryId);
    setEditingCategoryName(item.categoryName);
    setPrevCategory(item.categoryName);
  };

  const handleEditInputChange = e => setEditingCategoryName(e.target.value);
  const handleModalClose = () => setLogoutModal(false);
  const deleteModalClose = () => setDeleteModal(false);

  const handleSubmit = name => {
    console.log(newCategory, activeCategory);
    axios
      .post(`/api/category/`, {
        largeCategory: STRING.CATEGORY[activeCategory],
        categoryName: newCategory,
      })
      .then(() => {
        dispatch(
          setSmallCategoryData({
            largeCategory: activeCategory,
            categoryName: name,
          })
        );
      });
    setNewCategory('');
    setLogoutModal('');
  };

  const handleEditSubmit = () => {
    axios
      .put(`/api/category/${editingCategoryId}`, {
        categoryId: editingCategoryId,
        largeCategory: STRING.CATEGORY[activeCategory],
        categoryName: editingCategoryName,
      })
      .then(() => {
        setEditingCategoryId(null);
        dispatch(
          editCategoryData({
            largeCategory: activeCategory,
            categoryName: editingCategoryName,
            prevCategory,
          })
        );
      });
  };

  return (
    <CategoryContainer>
      <ManageSidebar
        largetCategoryList={largetCategoryList}
        activeCategory={activeCategory}
        onClickMenu={onClickMenu}
        setActiveCategory={onClickMenu}
      />
      {getSmallCategory && (
        <CategoryWrapper show={getSmallCategory.show}>
          <SmallCategoryItemsWrapper>
            <SmallCategoryRow>
              {getSmallCategory.list.map(item =>
                editingCategoryId === item.categoryId ? (
                  <SmallCategoryItemContainer key={item.categoryId}>
                    <Test>
                      <InputWrapper>
                        <Input
                          value={editingCategoryName}
                          setState={handleEditInputChange}
                          type="text"
                        />
                        {editingCategoryName && (
                          <CancelInputWrapper onClick={handleInputClear}>
                            <CancelInput />
                          </CancelInputWrapper>
                        )}
                      </InputWrapper>
                      <IconBox>
                        <Save onClick={() => handleEditSubmit()}>완료</Save>
                        <Trash
                          onClick={() => {
                            setIdModalCategory(item.categoryId);
                            setDeleteModal(true);
                          }}
                        />
                      </IconBox>
                    </Test>
                  </SmallCategoryItemContainer>
                ) : (
                  <SmallCategoryItemContainer key={uuidv4()}>
                    <Button>
                      <span>{item.categoryName}</span>
                      <IconBox>
                        <Edit onClick={() => handleEditClick(item)} />
                        <Trash
                          onClick={() => {
                            setIdModalCategory(item.categoryId);
                            setDeleteModal(true);
                          }}
                        />
                        <CustomModal
                          isOpen={
                            deleteModal && idModalCategory === item.categoryId
                          }
                          onClose={deleteModalClose}
                          submit={() => {
                            handleDeleteCategory(item.categoryId);
                            setDeleteModal(false);
                            setIdModalCategory(null);
                          }}
                          text={'삭제 완료'}
                        >
                          정말 삭제 하시겠습니까?
                        </CustomModal>
                      </IconBox>
                    </Button>
                  </SmallCategoryItemContainer>
                )
              )}
              <Button mainBtn="border" type="button" onClick={setLogoutModal}>
                <Add /> 소분류 추가
              </Button>
              <CustomModal
                isOpen={logoutModal}
                onClose={handleModalClose}
                submit={() => handleSubmit(newCategory)}
                text={'추가 완료'}
              >
                소분류 추가
                <InputBox>
                  <Input
                    value={newCategory}
                    setState={e => setNewCategory(e.target.value)}
                    placeholder="소분류명을 입력해 주세요"
                    type="text"
                  />
                </InputBox>
              </CustomModal>
            </SmallCategoryRow>
          </SmallCategoryItemsWrapper>
        </CategoryWrapper>
      )}
    </CategoryContainer>
  );
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CancelInputWrapper = styled.div`
  position: absolute;
  top: 55%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Test = styled.div`
  width: 20.125rem;
  height: 3.4375rem;
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  margin-top: 0.125rem;
  background-color: ${props => props.theme.color.blue.brandColor2};
  border-radius: 0.5rem;
  padding: 0.75rem 1.375rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-left: 0.25rem;
  margin-right: 0.1563rem;

  input {
    background-color: white;
    width: 7.1875rem;
    height: 1.9375rem;
    min-height: 1.25rem;
    color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const IconBox = styled.div`
  ${props => props.theme.FlexRow};
  width: 3.625rem;
  gap: 1.125rem;
  cursor: pointer;
`;

const InputBox = styled.div`
  margin-top: 20px;
  background: #f7faff;
  border: 1px solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  color: ${props => props.theme.color.blue.brandColor7};
  input {
    width: 11rem;
    font-size: 1rem;
    line-height: 1.1875rem;
    ::placeholder {
      color: ${props => props.theme.color.blue.brandColor7};
    }
  }
`;

const CategoryContainer = styled.div`
  ${props => props.theme.wh100};
  display: flex;
`;

const CategoryWrapper = styled.div`
  ${props => props.theme.wh100};
`;
const SmallCategoryRow = styled.div`
  ${props => props.theme.FlexRow};
  flex-wrap: wrap;
  gap: 0.875rem;
  button {
    width: 20.125rem;
    height: 3.4375rem;
    :hover {
      background-color: ${props => props.theme.color.blue.brandColor2};
    }
  }
`;
const SmallCategoryItemsWrapper = styled.div`
  ${props => props.theme.FlexRow};
  color: ${props => props.theme.color.grey.brandColor5};
  position: relative;
  padding: 1.625rem 2.0625rem;
`;

const SmallCategoryItemContainer = styled.div`
  ${props => props.theme.FlexRow};
  button {
    padding: 1.125rem 1.875rem;
    justify-content: space-between;
    display: flex;
    border: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
    width: 20.125rem;
    height: 3.4375rem;
  }
  span {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.1875rem;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
  svg {
    opacity: 0;
  }
`;
