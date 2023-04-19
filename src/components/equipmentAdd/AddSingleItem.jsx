import React, { useState, useEffect } from 'react';
import { styles } from '../common/commonStyled';
import Button from 'elements/Button';

import { api } from 'api/axios';
import SelectCategory from '../common/SelectCategory';
import SelectCategoryList from './single/SelectCategoryList';
import EquipmentInput from './single/EquipmentInput';
import SelectUser from './single/SelectUser';
import ImageAdd from './single/ImageAdd';
import STRING from 'constants/string';
import Input from 'elements/Input';
import alertModal from 'utils/alertModal';
import Valid from 'validation/validation';
import PLACEHOLDER from 'constants/placeholder';

export default function AddSingleItem({ categoryList, largeCategoryList }) {
  const [largeCategory, setLargeCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [partnersId, setPartnersId] = useState('');
  const [deptId, setDeptId] = useState('');
  const [userId, setUserId] = useState('');
  const [useType, setUseType] = useState('');

  const [dept, setDept] = useState(null);
  const [user, setUser] = useState(null);
  const [partners, setPartners] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [serialValue, setSerialValue] = useState('');
  const [smallCategory, setSmallCategory] = useState(null);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const [formImage, setFormImage] = useState([]);
  const [preview, setPreview] = useState('');
  const [crawlingImg, setCrawlingImg] = useState(null);
  const [optionNullList, setOptionNullList] = useState({
    largeCategory: '대분류',
    smallCategory: '소분류',
    partners: '회사명',
    dept: '부서명',
    user: '공용',
  });

  const isDisabled =
    !largeCategory ||
    !nameValue ||
    !serialValue ||
    (!categoryName && !categoryInput) ||
    (!formImage.length && !preview.length);

  useEffect(() => {
    api
      .get(`/api/partners`)
      .then(res =>
        setPartners([
          { partnersId: '', partnersName: '선택 안함' },
          ...res.data.data,
        ])
      );
    api
      .get(`/api/dept`)
      .then(res =>
        setDept([{ deptId: '', deptName: '선택 안함' }, ...res.data.data])
      );
  }, []);

  const initData = () => {
    setNameValue('');
    setSerialValue('');
    setPreview([]);
    setFormImage([]);
    setUser(null);
    setCrawlingImg(null);
    setSmallCategory(null);
    setShowCategoryInput(false);

    setCategoryInput('');
    setUseType('');
    setLargeCategory('');
    setCategoryName('');
    setPartnersId('');
    setDeptId('');
    setUserId('');

    setOptionNullList({
      largeCategory: '대분류',
      smallCategory: '소분류',
      partners: '회사명',
      dept: '부서명',
      user: '공용',
    });
  };

  const handleChangeNameValue = e => {
    setNameValue(e.target.value);
  };

  const handleChangeSerialValue = e => {
    const serialNumber = e.target.value;
    setSerialValue(serialNumber);
  };

  const handleChangeLargeCategory = e => {
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({
      ...state,
      largeCategory: text,
      smallCategory: '소분류',
    }));

    setLargeCategory(STRING.CATEGORY[text]);
    setSmallCategory([
      { categoryName: '직접입력' },
      ...parseCategoryData(text, categoryList),
    ]);
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, smallCategory: text }));

    if (text === '직접입력') {
      setShowCategoryInput(true);
      setCategoryName('');
      return;
    }

    setCategoryName(ko);
    setShowCategoryInput(false);
  };

  const handleChangeCategoryInput = e => setCategoryInput(e.target.value);

  const handleChangePartners = e => {
    const { ko: partners } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, partners: text }));

    setPartnersId(partners);
  };

  const handleChangeDept = e => {
    const { ko: dept } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, dept: text, user: '공용' }));

    if (dept) {
      getUserData(dept);
      setDeptId(dept);
      setUserId('');
      setUseType(STRING.USE_TYPE['공용']);
      return;
    }

    setDeptId('');
    setUserId('');
    setUseType('');
    setUser('');
  };

  const handleChangeUser = e => {
    const { ko: user } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, user: text }));

    if (user) {
      setUserId(user);
      setUseType(STRING.USE_TYPE['개인']);
      return;
    }
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const handleDeleteImage = e => {
    setFormImage([]);
    setPreview([]);
  };

  const onChangeimge = e => {
    const img = e.target.files[0];
    setFormImage([img]);
    setPreviewImage(img);
    setCrawlingImg('');
  };

  const setPreviewImage = img => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview([reader.result]);
    };
    reader.readAsDataURL(img);
  };

  const setFormData = e => {
    e.preventDefault();

    if (
      categoryInput &&
      !Valid.inputCheck([[categoryInput, '카테고리']], /[^ㄱ-ㅎㅏ-ㅣ]{1,30}$/)
    ) {
      return;
    }

    if (
      !Valid.inputCheck(
        [
          [nameValue, '제품명'],
          [serialValue, '시리얼 넘버'],
        ],
        [/[^ㄱ-ㅎㅏ-ㅣ]{1,30}$/, /[^ㄱ-ㅎㅏ-ㅣ]{1,30}$/]
      )
    ) {
      return;
    }

    const formData = new FormData();

    formData.append('largeCategory', largeCategory);
    formData.append('categoryName', categoryName || categoryInput);
    formData.append('modelName', nameValue);
    formData.append('serialNum', serialValue);
    formData.append('partnersId', partnersId);
    formData.append('userId', userId);
    formData.append('deptId', deptId);
    formData.append('useType', useType);

    if (formImage.length) {
      formData.append('multipartFile', formImage[0]);
    } else {
      formData.append('image', crawlingImg);
    }

    sendFormData(formData);
  };

  const getUserData = deptId =>
    api.get(`/api/user/${deptId}`).then(res => setUser(res.data.data));

  const sendFormData = formData =>
    api.post(`/api/supply`, formData).then(() => {
      initData();
      alertModal(true, '비품 등록이 완료되었습니다.', 2);
    });

  const getCrawlingData = () => {
    api.get(`/api/supply/search?modelNameList=${nameValue}`).then(res => {
      setCrawlingImg(res.data.data[0].image);
      setPreview([res.data.data[0].image]);
      setFormImage([]);
    });
  };

  const handleClickCrawling = e => {
    e.preventDefault();
    getCrawlingData();
  };

  return (
    <>
      {categoryList && (
        <styles.AddEquipmentWrapper>
          <styles.AddEquipmentArticle>
            <styles.EquipmentDetailContainer>
              <styles.EquipmentLeftContainer>
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    비품종류
                  </styles.TypeTitle>
                  <styles.SelectCaregoryConteiner>
                    <SelectCategoryList
                      category={[largeCategoryList, smallCategory]}
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
                  {showCategoryInput && (
                    <styles.CategoryInputContainer>
                      <Input
                        value={categoryInput}
                        onChange={handleChangeCategoryInput}
                        placeholder={PLACEHOLDER.ENTER_YOUR_SELF}
                        maxLength={10}
                      />
                    </styles.CategoryInputContainer>
                  )}
                </styles.TypeBox>
                <EquipmentInput
                  value={[nameValue, serialValue]}
                  setValue={[handleChangeNameValue, handleChangeSerialValue]}
                  onCrawling={handleClickCrawling}
                />

                <styles.TypeBox>
                  <styles.TypeTitle>협력업체</styles.TypeTitle>
                  <styles.PartnerCompany>
                    <styles.SelectBox>
                      <SelectCategory
                        category={partners}
                        optionNullName={optionNullList.partners}
                        optionKey={'partnersName'}
                        optionValueKey={'partnersId'}
                        optionName={'partnersName'}
                        onChangeCategory={handleChangePartners}
                      />
                    </styles.SelectBox>
                  </styles.PartnerCompany>
                </styles.TypeBox>
                <styles.TypeBox>
                  <styles.TypeTitle>사용자</styles.TypeTitle>
                  <styles.SelectBox>
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
                  </styles.SelectBox>
                </styles.TypeBox>
              </styles.EquipmentLeftContainer>
              <styles.Hr />
              <div>
                <styles.TypeTitle requiredinput="true">이미지</styles.TypeTitle>
                <ImageAdd
                  editMode={'true'}
                  preview={preview}
                  onChangeimge={onChangeimge}
                  onDeleteImage={handleDeleteImage}
                />
              </div>
            </styles.EquipmentDetailContainer>
            <styles.SubminPostContainer>
              <Button submit post onClick={setFormData} disabled={isDisabled}>
                비품 등록 완료
              </Button>
            </styles.SubminPostContainer>
          </styles.AddEquipmentArticle>
        </styles.AddEquipmentWrapper>
      )}
    </>
  );
}
