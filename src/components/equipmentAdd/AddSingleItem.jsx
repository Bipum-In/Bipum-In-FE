import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../elements/Button';
import { ErrorModal } from '../../elements/AlertModal';
import { useModalState } from '../../hooks/useModalState';

import Axios from '../../api/axios';
import SelectCategory from '../common/SelectCategory';
import SelectCategoryList from './single/SelectCategoryList';
import SelectDate from './single/SelectDate';
import EquipmentInput from './single/EquipmentInput';
import SelectUser from './single/SelectUser';
import ImageAdd from './single/ImageAdd';
import useSetEquipmentAddDate from '../../hooks/useSetEquipmentAddDate';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);
const equipmentData = {
  largeCategory: '',
  categoryName: '',
  modelName: '',
  serialNum: '',
  partnersId: null,
  userId: null,
};

export default function AddSingleItem({ category, largeCategory }) {
  const [isErrorModalOpen, toggleErrorModal, errorMessage, setErrorAndToggle] =
    useModalState();

  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const [checkSallCategory, setCheckSallCategory] = useState(false);
  const [formImage, setFormformImage] = useState(null);
  const [crawlingImg, setCrawlingImg] = useState(null);

  const [preview, setPreview] = useState('');

  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;
  console.log(largeCategory);

  useEffect(() => {
    axios.get(`/api/partners`).then(res => setPartners(res.data.data));
    axios.get(`/api/dept`).then(res => setDept(res.data.data));
  }, []);

  const handleChangeNameValue = e => {
    setNameValue(e.target.value);
  };

  const handleChangeSerialValue = e => {
    setSerialValue(e.target.value);
  };

  const handleChangeLargeCategory = e => {
    const { ko, eng } = JSON.parse(e.target.value);
    equipmentData.largeCategory = eng;
    setSmallCategory(parseCategoryData(ko, category));

    console.log(equipmentData.largeCategory);
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    equipmentData.categoryName = ko;
    setCheckSallCategory(equipmentData.categoryName);
    console.log(checkSallCategory);
  };

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    console.log(partners);
    equipmentData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    getUserData(dept);
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    equipmentData.userId = user;
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
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
    formData.append('image', crawlingImg);
    if (formImage !== null) {
      formData.append('multipartFile', formImage);
    }
    sendFormData(formData);

    // FormData 내용 확인
    for (let value of formData) {
      console.log(value);
    }
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = formData => axios.post(`/api/supply`, formData);

  const getCrawlingData = () => {
    axios
      .get(`/api/supply/search?modelName=${nameValue}`)
      .then(res => {
        setCrawlingImg(res.data.data.image);
        setPreview(res.data.data.image);
        setFormformImage('');
      })
      .catch(err => {
        setErrorAndToggle(err);
      });
  };

  console.log(formImage);

  const handleClickCrawling = e => {
    e.preventDefault();
    getCrawlingData();
  };

  const isDisabled =
    !serialValue ||
    !nameValue ||
    !equipmentData.largeCategory ||
    !checkSallCategory ||
    // !preview;

    console.log(formImage);

  return (
    <>
      {category && (
        <AddEquipmentWrapper>
          <AddEquipmentArticle>
            <EquipmentDetailContainer>
              <EquipmentLeftContainer>
                <TypeBox>
                  <TypeTitle requiredinput="true">비품종류</TypeTitle>
                  <SelectCaregoryConteiner>
                    <SelectCategoryList
                      category={[parseLargeCategory, smallCategory]}
                      optionName={['name', 'categoryName']}
                      optionNullName={['대분류', '소분류']}
                      optionKey={['name', 'categoryName']}
                      optionValueKey={['name', 'categoryName']}
                      onChangeCategory={[
                        handleChangeLargeCategory,
                        handleChangeSmallCategory,
                      ]}
                    />
                  </SelectCaregoryConteiner>
                </TypeBox>
                <EquipmentInput
                  value={[nameValue, serialValue]}
                  setValue={[handleChangeNameValue, handleChangeSerialValue]}
                  onCrawling={handleClickCrawling}
                />

                <TypeBox>
                  <TypeTitle>협력업체</TypeTitle>
                  <PartnerCompany>
                    <SelectCategory
                      category={partners}
                      optionNullName="회사명"
                      optionKey={'partnersName'}
                      optionValueKey={'partnersId'}
                      optionName={'partnersName'}
                      onChangeCategory={handleChangePartners}
                    />
                  </PartnerCompany>
                </TypeBox>
                <TypeBox>
                  <TypeTitle>사용자</TypeTitle>
                  <SelectUser
                    category={[dept, user]}
                    optionNullName={['부서명', '사원명']}
                    optionKey={['deptName', 'empName']}
                    optionValueKey={['deptId', 'userId']}
                    optionName={['deptName', 'empName']}
                    onChangeCategory={[handleChangeDept, handleChangeUser]}
                  />
                </TypeBox>
              </EquipmentLeftContainer>
              <Hr />
              <ImageAdd preview={preview} onChangeimge={onChangeimge} />
            </EquipmentDetailContainer>
            <SubminPostContainer>
              <Button submit post onClick={setFormData} disabled={isDisabled}>
                비품 등록 완료
              </Button>
            </SubminPostContainer>
          </AddEquipmentArticle>
        </AddEquipmentWrapper>
      )}
      <ErrorModal
        isOpen={isErrorModalOpen}
        toggle={toggleErrorModal}
        onClose={toggleErrorModal}
        message={errorMessage}
      />
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

const SelectCaregoryConteiner = styled.div`
  display: flex;
  gap: 0.5rem;
  select {
    min-width: 5.25rem;
    height: 2.6rem;

    border-color: ${props => props.theme.color.blue.brandColor3};
    color: ${props => props.theme.color.blue.brandColor6};
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;

const PartnerCompany = styled.div`
  min-width: 5.8125rem;
  height: 2.5rem;
`;

const TypeTitle = styled.span`
  font-size: 1rem;
  min-width: 8.75rem;
  ${props =>
    props.requiredinput === 'true' &&
    css`
      &::before {
        content: '*';
        color: red;
        padding-right: 0.3125rem;
      }
    `}
`;
const TypeBox = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 0.5rem;
  width: 37rem;
  height: 2.5rem;
  Input {
    width: 28.125rem;
    height: 2.5rem;
    background: ${props => props.theme.color.grey.brandColor1};
    border-radius: 0.5rem;
  }
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
