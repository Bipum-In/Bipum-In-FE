import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Axios from '../../api/axios';
import SelectCategory from '../common/SelectCategory';
import SelectCategoryList from './single/SelectCategoryList';
import SelectDate from './single/SelectDate';
import EquipmentInput from './single/EquipmentInput';
import SelectUser from './single/SelectUser';
import ImageAdd from './single/ImageAdd';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);
const equipmentData = {
  largeCategory: '',
  categoryName: '',
  modelName: '',
  serialNum: '',
  createdAt: '',
  partnersId: null,
  userId: null,
};

export default function AddSingleItem({ category, largeCategory }) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

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
    console.log(equipmentData);
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    equipmentData.categoryName = ko;
  };

  const handleChangeYear = e => {
    const year = e.target.value;
    const parseYear = Number(year.split('년')[0]);
    setYear(parseYear);
  };

  const handleChangeMonth = e => {
    const month = e.target.value;
    const parseMonth = Number(month.split('월')[0]);
    setMonth(parseMonth);
  };

  const handleChangeDay = e => {
    const day = e.target.value;
    setDay(day);
  };

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    equipmentData.partnersId = partners;
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    getUserData(dept);
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    equipmentData.userId = user;
    console.log(equipmentData);
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const setSelectYear = () => {
    const date = new Date();
    const year = date.getFullYear();

    return Array.from({ length: 30 }).map((_, i) => `${year - i}년`);
  };

  const setSelectMonth = () => {
    return Array.from({ length: 12 }).map((_, i) => `${i + 1}월`);
  };

  const setSelectDaysInMonth = (year, month) => {
    const date = new Date(year, month, 0);
    const days = date.getDate();
    return Array.from({ length: days }).map((_, i) => `${i + 1}일`);
  };

  const getUserData = deptId => {
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));
  };

  //========================================================

  const [formImage, setFormformImage] = useState(null);
  const [preview, setPreview] = useState('');
  function onChangeimge(e) {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append('image', img);
    const reader = new FileReader();
    setFormformImage(formImg);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    console.log(img);
    if (img) {
      reader.readAsDataURL(img);
    } else {
      setPreview('');
    }
  }

  const onValid = data => {
    const formData = new FormData();
    // formData.append('largeCategory');
    // formData.append('categoryName');
    // formData.append('modelName');
    // formData.append('serialNum');
    // formData.append('createdAt');
    // formData.append('partnersId');
    // formData.append('userId');
    for (const keyValue of formImage) {
      formData.append(keyValue[0], keyValue[1]);
    }
    console.log(data);
  };

  return (
    <>
      {category && (
        <Container>
          <AddContainer onSubmit={onValid}>
            <EquipmentContainer>
              <TypeBox>
                <TypeTitle requiredinput="true">비품종류</TypeTitle>
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
              </TypeBox>
              <EquipmentInput
                value={[nameValue, serialValue]}
                setValue={[handleChangeNameValue, handleChangeSerialValue]}
              />
              <SelectDate
                year={year}
                month={month}
                setSelect={[
                  setSelectYear,
                  setSelectMonth,
                  setSelectDaysInMonth,
                ]}
                handleChange={[
                  handleChangeYear,
                  handleChangeMonth,
                  handleChangeDay,
                ]}
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
              <SelectUser
                category={[dept, user]}
                optionNullName={['부서명', '사원명']}
                optionKey={['deptName', 'empName']}
                optionValueKey={['deptId', 'userId']}
                optionName={['deptName', 'empName']}
                onChangeCategory={[handleChangeDept, handleChangeUser]}
              />
            </EquipmentContainer>
            <ImageAdd preview={preview} onChangeimge={onChangeimge} />
            <ButtonBox>
              <Button type="submit">비품 등록 완료</Button>
            </ButtonBox>
          </AddContainer>
        </Container>
      )}
    </>
  );
}

const PartnerCompany = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;

const ButtonBox = styled.div`
  position: absolute;
  right: 0rem;
  bottom: 3.5rem;
  display: flex;
  justify-content: center;
  width: 100%;

  Button {
    border: 0;
    color: white;
    width: 21.9375rem;
    height: 3.875rem;
    font-weight: 700;
    font-size: 1.375rem;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const TypeTitle = styled.span`
  font-size: 1.125rem;
  width: 8.75rem;
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
const EquipmentContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 37rem;
  height: 30.625rem;
  gap: 3.125rem;
`;

const AddContainer = styled.form`
  width: 100%;
  display: flex;
  margin: 7.25rem 11rem 12rem 11rem;
  justify-content: space-between;
`;

const Container = styled.div`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;
