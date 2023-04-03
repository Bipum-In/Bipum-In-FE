import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { styles } from '../common/commonStyled';
import Button from 'elements/Button';

import Axios from 'api/axios';
import SelectCategory from '../common/SelectCategory';
import SelectCategoryList from './single/SelectCategoryList';
import EquipmentInput from './single/EquipmentInput';
import SelectUser from './single/SelectUser';
import ImageAdd from './single/ImageAdd';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);
const equipmentData = {
  largeCategory: '',
  categoryName: '',
  modelName: '',
  serialNum: '',
  partnersId: '',
  userId: '',
};

export default function AddSingleItem({ category, largeCategory }) {
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const [checkSallCategory, setCheckSallCategory] = useState(false);
  const [formImage, setFormformImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [crawlingImg, setCrawlingImg] = useState(null);
  const [optionNullList, setOptionNullList] = useState({
    largeCategory: '대분류',
    smallCategory: '소분류',
    partners: '회사명',
    dept: '부서명',
    user: '사원명',
  });

  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  useEffect(() => {
    axios
      .get(`/api/partners`)
      .then(res =>
        setPartners([
          { partnersId: '', partnersName: '선택 안함' },
          ...res.data.data,
        ])
      );
    axios
      .get(`/api/dept`)
      .then(res =>
        setDept([{ deptId: '', deptName: '선택 안함' }, ...res.data.data])
      );
  }, []);

  const initData = () => {
    setNameValue('');
    setSerialValue('');
    setUser(null);
    setPreview(null);
    setCrawlingImg(null);
    setFormformImage(null);
    setSmallCategory(null);
    setCheckSallCategory(null);
    setOptionNullList({
      largeCategory: '대분류',
      smallCategory: '소분류',
      partners: '회사명',
      dept: '부서명',
      user: '사원명',
    });
  };

  const handleChangeNameValue = e => {
    setNameValue(e.target.value);
  };

  const handleChangeSerialValue = e => {
    setSerialValue(e.target.value);
  };

  const handleChangeLargeCategory = e => {
    const { ko, eng } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({
      ...state,
      largeCategory: text,
      smallCategory: '소분류',
    }));

    equipmentData.largeCategory = eng;
    setSmallCategory(parseCategoryData(ko, category));
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, smallCategory: text }));

    equipmentData.categoryName = ko;
    setCheckSallCategory(equipmentData.categoryName);
  };

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, partners: text }));

    equipmentData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, dept: text, user: '사원명' }));
    dept ? getUserData(dept) : setUser('');
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, user: text }));

    equipmentData.userId = user;
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const handleDeleteImage = e => {
    setFormformImage(null);
    setPreview(null);
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    setFormformImage(img);
    setPreviewImage(img);
    setCrawlingImg('');
  };

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const setFormData = e => {
    e.preventDefault();
    const formData = new FormData();
    equipmentData.modelName = nameValue;
    equipmentData.serialNum = serialValue;

    formData.append('largeCategory', equipmentData.largeCategory);
    formData.append('categoryName', equipmentData.categoryName);
    formData.append('modelName', equipmentData.modelName);
    formData.append('serialNum', equipmentData.serialNum);
    formData.append('partnersId', equipmentData.partnersId);
    formData.append('userId', equipmentData.userId);

    if (formImage) {
      formData.append('multipartFile', formImage);
    } else {
      formData.append('image', crawlingImg);
    }

    sendFormData(formData);
    initData();
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = formData => axios.post(`/api/supply`, formData);

  const getCrawlingData = () => {
    axios.get(`/api/supply/search?modelName=${nameValue}`).then(res => {
      setCrawlingImg(res.data.data.image);
      setPreview(res.data.data.image);
      setFormformImage('');
    });
  };

  const handleClickCrawling = e => {
    e.preventDefault();
    getCrawlingData();
  };

  const isDisabled =
    !serialValue ||
    !nameValue ||
    !equipmentData.largeCategory ||
    !checkSallCategory;

  return (
    <>
      {category && (
        <AddEquipmentWrapper>
          <AddEquipmentArticle>
            <EquipmentDetailContainer>
              <EquipmentLeftContainer>
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    비품종류
                  </styles.TypeTitle>
                  <styles.SelectCaregoryConteiner>
                    <SelectCategoryList
                      category={[parseLargeCategory, smallCategory]}
                      optionName={['name', 'categoryName']}
                      optionNullName={[
                        optionNullList.largeCategory,
                        optionNullList.smallCategory,
                      ]}
                      optionKey={['name', 'categoryName']}
                      optionValueKey={['name', 'categoryName']}
                      onChangeCategory={[
                        handleChangeLargeCategory,
                        handleChangeSmallCategory,
                      ]}
                    />
                  </styles.SelectCaregoryConteiner>
                </styles.TypeBox>
                <EquipmentInput
                  value={[nameValue, serialValue]}
                  setValue={[handleChangeNameValue, handleChangeSerialValue]}
                  onCrawling={handleClickCrawling}
                />

                <styles.TypeBox>
                  <styles.TypeTitle>협력업체</styles.TypeTitle>
                  <PartnerCompany>
                    <SelectBox>
                      <SelectCategory
                        category={partners}
                        optionNullName={optionNullList.partners}
                        optionKey={'partnersName'}
                        optionValueKey={'partnersId'}
                        optionName={'partnersName'}
                        onChangeCategory={handleChangePartners}
                      />
                    </SelectBox>
                  </PartnerCompany>
                </styles.TypeBox>
                <styles.TypeBox>
                  <styles.TypeTitle>사용자</styles.TypeTitle>
                  <SelectBox>
                    <SelectUser
                      category={[dept, user]}
                      optionNullName={[
                        optionNullList.dept,
                        optionNullList.user,
                      ]}
                      optionKey={['deptName', 'empName']}
                      optionValueKey={['deptId', 'userId']}
                      optionName={['deptName', 'empName']}
                      onChangeCategory={[handleChangeDept, handleChangeUser]}
                    />
                  </SelectBox>
                </styles.TypeBox>
              </EquipmentLeftContainer>
              <Hr />
              <ImageAdd
                preview={preview}
                onChangeimge={onChangeimge}
                onDeleteImage={handleDeleteImage}
              />
            </EquipmentDetailContainer>
            <SubminPostContainer>
              <Button submit post onClick={setFormData} disabled={isDisabled}>
                비품 등록 완료
              </Button>
            </SubminPostContainer>
          </AddEquipmentArticle>
        </AddEquipmentWrapper>
      )}
    </>
  );
}

const AddEquipmentWrapper = styled.section`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const PartnerCompany = styled.div`
  min-width: 5.8125rem;
  height: 2.5rem;
`;

const AddEquipmentArticle = styled.form`
  ${props => props.theme.FlexCol};
  width: 100%;
  padding: 4.5rem 8.75rem;
  justify-content: center;
`;

const EquipmentDetailContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  min-height: 30.625rem;
`;

const EquipmentLeftContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 3.125rem;
`;

const Hr = styled.div`
  height: 100%;
  width: 0.0625rem;
  background-color: ${props => props.theme.color.grey.brandColor2};
  margin: 0 2.5rem;
`;

const SubminPostContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  padding-top: 1rem;
  width: 100%;
`;

const SelectBox = styled.div`
  ${props => props.theme.FlexRow};
  color: ${props => props.theme.color.grey.brandColor7};
  gap: 0.5rem;

  select {
    width: auto;
    border: 1px solid ${props => props.theme.color.grey.brandColor3};
    background-color: ${props => props.theme.color.grey.brandColor1};
    margin-right: 0.2rem;
  }

  path {
    stroke: ${props => props.theme.color.grey.brandColor7};
  }
`;
