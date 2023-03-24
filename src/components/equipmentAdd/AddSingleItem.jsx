import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../elements/Button';
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
  const [formImage, setFormformImage] = useState(null);
  const [preview, setPreview] = useState('');

  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  const [setSelectYear, setSelectMonth, setSelectDaysInMonth] =
    useSetEquipmentAddDate();

  useEffect(() => {
    axios.get(`/api/partners`).then(res => setPartners(res.data.data));
    axios.get(`/api/dept`).then(res => setDept(res.data.data));
  }, []);

  const handleChangeNameValue = e => {
    console.log(e.target.value);
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
    const parseDay = Number(day.split('일')[0]);
    setDay(parseDay);
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
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    if (!img) return;

    setFormformImage(img);
    setPreviewImage(img);
  };

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const setFormData = () => {
    const formData = new FormData();
    equipmentData.createdAt = new Date();
    equipmentData.modelName = nameValue;
    equipmentData.serialNum = serialValue;

    formData.append('largeCategory', equipmentData);
    formData.append('categoryName', equipmentData);
    formData.append('modelName', equipmentData);
    formData.append('serialNum', equipmentData);
    formData.append('createdAt', equipmentData);
    formData.append('partnersId', equipmentData);
    formData.append('userId', equipmentData);

    formData.append('image', formImage);
    console.log(equipmentData);
    sendFormData(formData);
  };

  const getUserData = deptId =>
    axios.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = formData => axios.post(`/api/supply/`, formData);

  return (
    <>
      {category && (
        <Container>
          <AddContainer>
            <EquipmentContainer>
              <TypeBox>
                <TypeTitle requiredinput="true">비품종류</TypeTitle>
                <SelectCaregoryConteiner>
                  <SelectCategoryList
                    eqtype="true"
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
              <Button onClick={setFormData}>비품 등록 완료</Button>
            </ButtonBox>
          </AddContainer>
        </Container>
      )}
    </>
  );
}

const SelectCaregoryConteiner = styled.div`
  display: flex;
  gap: 0.5rem;
  select {
    width: 5.25rem;
    height: 2.6rem;

    border-color: ${props => props.theme.color.blue.brandColor3};
    color: ${props => props.theme.color.blue.brandColor6};
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;

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
  height: 30.625rem;
  gap: 3.125rem;
  border-right: 1px solid;
  border-color: ${props => props.theme.color.grey.brandColor2};
  padding-right: 9.5rem;
`;

const AddContainer = styled.article`
  width: 100%;
  display: flex;
  margin: 7.25rem 11rem 12rem 11rem;
  justify-content: space-between;
`;

const Container = styled.section`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;
