import React, { useEffect, useRef, useState } from 'react';
import { styles } from '../common/commonStyled';

import Button from 'elements/Button';
import SelectCategoryList from '../equipmentAdd/single/SelectCategoryList';
import { api } from 'api/axios';
import STRING from 'constants/string';
import ImageAdd from '../equipmentAdd/single/ImageAdd';
import SelectCategory from '../common/SelectCategory';
import Valid from 'validation/validation';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import PLACEHOLDER from 'constants/placeholder';
import QUERY from 'constants/query';

export default function UserEquipmentRequest({
  type,
  supplyId: supplyIdProps,
  modelName,
  category,
  largeCategory,
}) {
  const sendCheck = useRef(false);
  const [useType, setUseType] = useState('');
  const [supplyId, setSupplyId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [preview, setPreview] = useState([]);
  const [mySupply, setMysupply] = useState(null);
  const [formImage, setFormImage] = useState([]);
  const [messageValue, setMessageValue] = useState('');

  const [notSupplyLargeCategory, setNotSupplyLargeCategory] = useState(null);
  const [smallCategory, setSmallCategory] = useState(null);
  const [optionNullList, setOptionNullList] = useState({
    largeCategory: '대분류',
    smallCategory: '소분류',
    supply: '선택',
    useType: '선택',
  });

  const { userRole } = getEncryptionStorage();

  const isDisabled = () => {
    let isDisabled = null;

    if (!modelName && type === 'SUPPLY') {
      isDisabled = !messageValue || !smallCategory || !useType;
      return isDisabled;
    }

    if (!modelName && type !== 'SUPPLY') {
      isDisabled =
        !messageValue ||
        !smallCategory ||
        !supplyId ||
        !formImage.length ||
        !useType;
      return isDisabled;
    }

    if (modelName) {
      isDisabled = !messageValue || !formImage.length;
      return isDisabled;
    }
  };

  const initData = () => {
    sendCheck.current = false;
    setUseType('');
    setSupplyId('');
    setCategoryId('');
    setPreview([]);
    setFormImage([]);
    setMysupply(null);
    setMessageValue('');
    setSmallCategory(null);
    setOptionNullList({
      largeCategory: '대분류',
      smallCategory: '소분류',
      supply: '선택',
      useType: '선택',
    });
  };

  const handleChagneMessage = e => {
    setMessageValue(e.target.value);
  };

  const handleChangeMySupply = e => {
    const { ko: id } = JSON.parse(e.target.value);
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({ ...state, supply: text }));

    setSupplyId(id);
  };

  const handleChangeUseType = e => {
    const text = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList({
      useType: text,
      largeCategory: '대분류',
      smallCategory: '소분류',
      supply: '선택',
    });

    if (type !== 'SUPPLY' && text) {
      getNotSupplyLargeCategory(text);
    }

    setUseType(STRING.USE_TYPE[text]);
    setSmallCategory(null);
    setMysupply(null);
  };

  const handleChangeLargeCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    const largeCategory = e.target.options[e.target.selectedIndex].innerText;
    const smallCatagory = parseCategoryData(ko, category);

    setOptionNullList(state => ({
      ...state,
      largeCategory,
      smallCategory: '소분류',
      supply: '선택',
    }));

    if (type !== 'SUPPLY' && useType) {
      getNotSupplySmallCategory(ko, useType);
      return;
    }

    setCategoryId(smallCatagory[0].categoryId);
    setSmallCategory(smallCatagory);
  };

  const handleChangeSmallCategory = e => {
    const { ko: categoryId } = JSON.parse(e.target.value);
    const smallCategory = e.target.options[e.target.selectedIndex].innerText;
    setOptionNullList(state => ({
      ...state,
      smallCategory,
      supply: '선택',
    }));

    setCategoryId(categoryId);
    type !== 'SUPPLY' && getMySupply(categoryId);
  };

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const setFormData = e => {
    e.preventDefault();
    if (sendCheck.current) return;
    sendCheck.current = true;

    const formData = new FormData();

    formData.append('requestType', type);
    formData.append('content', messageValue);
    formData.append('useType', useType);

    if (type === 'SUPPLY') {
      formData.append('categoryId', categoryId);
    } else {
      formData.append('supplyId', supplyIdProps || supplyId);
    }

    if (formImage) {
      formImage.forEach(img => {
        formData.append('multipartFile', img);
      });
    }

    sendFormData(formData);
  };

  const handleChangeimge = e => {
    const img = [...e.target.files];
    const addImg = [...formImage, ...img];
    if (!Valid.imgLengthCheck(addImg, 10)) return;

    setFormImage(addImg);
    setPreviewImage(img);
  };

  const handleDeleteImage = imgPage => {
    const absImgPage = Math.abs(imgPage);
    if (Array.isArray(preview) && preview.length > 1) {
      const deletePreview = preview.filter((_, index) => index !== absImgPage);
      const deleteform = formImage.filter((_, index) => index !== absImgPage);

      setPreview(deletePreview);
      setFormImage(deleteform);
      return;
    }

    setPreview([]);
    setFormImage([]);
  };

  const setPreviewImage = images => {
    const previewArray = [];

    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        previewArray.push(reader.result);

        if (previewArray.length === images.length) {
          setPreview([...preview, ...previewArray]);
        }
      };

      reader.readAsDataURL(images[i]);
    }
  };

  const sendFormData = formData => {
    api
      .post(QUERY.END_POINT.REQUEST.SEND_PAGE, [
        formData,
        `${STRING.REQUEST_NAME[type]} 완료`,
      ])
      .then(() => initData())
      .catch(() => (sendCheck.current = false));
  };

  const getMySupply = categoryId => {
    const useTypeKO = STRING.USE_TYPE_ENG[useType];
    const common = useTypeKO === '공용' ? '/common' : '';
    api
      .get(QUERY.END_POINT.SUPPLY.MY(common, categoryId))
      .then(res => setMysupply(res.data.data));
  };

  const getNotSupplyLargeCategory = useType => {
    const common = useType === '공용' ? '/common' : '';

    api.get(QUERY.END_POINT.CATEGORY.MY_LARGE(common)).then(res => {
      const categoryList = res.data.data;
      const parseList = categoryList.map(category => {
        return { name: STRING.CATEGORY_ENG[category], type: category };
      });

      setNotSupplyLargeCategory(parseList);
    });
  };

  const getNotSupplySmallCategory = (largeType, useType) => {
    const useTypeKO = STRING.USE_TYPE_ENG[useType];
    const common = useTypeKO === '공용' ? '/common' : '';

    api.get(QUERY.END_POINT.CATEGORY.MY_SMALL(common, largeType)).then(res => {
      setSmallCategory(res.data.data);
    });
  };

  return (
    <>
      {category && (
        <styles.AddEquipmentWrapper>
          <styles.AddEquipmentArticle>
            <styles.EquipmentDetailContainer>
              <styles.EquipmentLeftContainer>
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    사용처
                  </styles.TypeTitle>
                  <styles.SelectCaregoryConteiner>
                    <SelectCategory
                      category={
                        userRole === 'USER'
                          ? ['개인']
                          : Object.keys(STRING.USE_TYPE)
                      }
                      optionNullName={optionNullList.useType}
                      onChangeCategory={handleChangeUseType}
                      disabled={modelName}
                    />
                  </styles.SelectCaregoryConteiner>
                </styles.TypeBox>
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    비품종류
                  </styles.TypeTitle>
                  <styles.SelectCaregoryConteiner>
                    <SelectCategoryList
                      category={[
                        type === 'SUPPLY'
                          ? largeCategory
                          : notSupplyLargeCategory,
                        smallCategory,
                      ]}
                      optionName={['name', 'categoryName']}
                      optionNullName={[
                        optionNullList.largeCategory,
                        optionNullList.smallCategory,
                      ]}
                      optionKey={['name', 'categoryName']}
                      optionValueKey={[
                        type === 'SUPPLY' ? 'name' : 'type',
                        'categoryId',
                      ]}
                      onChangeCategory={[
                        handleChangeLargeCategory,
                        handleChangeSmallCategory,
                      ]}
                      disabled={modelName}
                    />
                  </styles.SelectCaregoryConteiner>
                </styles.TypeBox>
                {type !== 'SUPPLY' ? (
                  <styles.TypeBox>
                    <styles.TypeTitle requiredinput="true">
                      제품명
                    </styles.TypeTitle>
                    <styles.SelectCaregoryConteiner>
                      <SelectCategory
                        category={mySupply}
                        optionName={'modelName'}
                        optionNullName={modelName || optionNullList.supply}
                        optionKey={'supplyId'}
                        optionValueKey={'supplyId'}
                        onChangeCategory={handleChangeMySupply}
                      />
                    </styles.SelectCaregoryConteiner>
                  </styles.TypeBox>
                ) : null}
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    {type === 'SUPPLY' ? '요청 메시지' : '요청 사유'}
                  </styles.TypeTitle>
                  <styles.TextAreaContainer>
                    <styles.TextArea
                      value={messageValue}
                      onChange={handleChagneMessage}
                      placeholder={PLACEHOLDER.lEAVE_TO_MESSAGE_LENGTH(100)}
                      maxLength={100}
                    />
                    <styles.TextLength>
                      <span>{messageValue.length}/100</span>
                    </styles.TextLength>
                  </styles.TextAreaContainer>
                </styles.TypeBox>
              </styles.EquipmentLeftContainer>
              {type !== 'SUPPLY' && (
                <styles.ImageContainer>
                  <styles.TypeTitle requiredinput="true">
                    사진첨부
                  </styles.TypeTitle>
                  <ImageAdd
                    editMode={'true'}
                    preview={preview}
                    onChangeimge={handleChangeimge}
                    onDeleteImage={handleDeleteImage}
                  />
                </styles.ImageContainer>
              )}
            </styles.EquipmentDetailContainer>
            <styles.SubminPostContainer>
              <Button submit post onClick={setFormData} disabled={isDisabled()}>
                {STRING.REQUEST_NAME[type]} 완료
              </Button>
            </styles.SubminPostContainer>
          </styles.AddEquipmentArticle>
        </styles.AddEquipmentWrapper>
      )}
    </>
  );
}
