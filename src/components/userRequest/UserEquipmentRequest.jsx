import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'elements/Button';
import { styles } from '../common/commonStyled';
import SelectCategoryList from '../equipmentAdd/single/SelectCategoryList';
import Axios from 'api/axios';
import STRING from 'constants/string';
import ImageAdd from '../equipmentAdd/single/ImageAdd';
import SelectCategory from '../common/SelectCategory';
import Valid from 'validation/validation';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function UserEquipmentRequest({
  type,
  category,
  largeCategory,
}) {
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
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  useEffect(() => {
    initData();
  }, [type]);

  const initData = () => {
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
      getNotSupplySmallCategory(ko);
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

  const setFormData = () => {
    const formData = new FormData();

    formData.append('requestType', type);
    formData.append('content', messageValue);
    formData.append('useType', useType);

    if (type === 'SUPPLY') {
      formData.append('categoryId', categoryId);
    } else {
      formData.append('supplyId', supplyId);
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
    axios
      .post(`/api/requests`, [formData, `${STRING.REQUEST_NAME[type]} 완료`])
      .then(() => initData());
  };

  const getMySupply = categoryId => {
    axios
      .get(`/api/supply/mysupply/${categoryId}`)
      .then(res => setMysupply(res.data.data));
  };

  const getNotSupplyLargeCategory = useType => {
    const common = useType === '공용' ? '/common' : '';

    axios.get(`/api/category${common}/myLargeCategory`).then(res => {
      const categoryList = res.data.data;
      const parseList = categoryList.map(category => {
        return { name: STRING.CATEGORY_ENG[category], type: category };
      });

      setNotSupplyLargeCategory(parseList);
    });
  };

  const getNotSupplySmallCategory = largeType => {
    const common = useType === '공용' ? '/common' : '';

    axios
      .get(`/api/category${common}/myCategory?largeCategory=${largeType}`)
      .then(res => {
        setSmallCategory(res.data.data);
      });
  };

  const isDisabled =
    type === 'SUPPLY'
      ? !messageValue || !smallCategory || !useType
      : !messageValue || !smallCategory || !supplyId || !formImage || !useType;

  return (
    <>
      {category && (
        <AddEquipmentWrapper>
          <AddEquipmentArticle>
            <EquipmentDetailContainer>
              <EquipmentLeftContainer>
                <styles.TypeBox>
                  <styles.TypeTitle requiredinput="true">
                    사용처
                  </styles.TypeTitle>
                  <styles.SelectCaregoryConteiner>
                    <SelectCategory
                      category={Object.keys(STRING.USE_TYPE)}
                      optionNullName={optionNullList.useType}
                      onChangeCategory={handleChangeUseType}
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
                          ? parseLargeCategory
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
                        optionNullName={optionNullList.supply}
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
                  <TextArea
                    value={messageValue}
                    onChange={e => setMessageValue(e.target.value)}
                  />
                </styles.TypeBox>
              </EquipmentLeftContainer>
              {type !== 'SUPPLY' && (
                <ImageContainer>
                  <ImageAdd
                    preview={preview}
                    onChangeimge={handleChangeimge}
                    onDeleteImage={handleDeleteImage}
                  >
                    <styles.TypeTitle>사진 첨부</styles.TypeTitle>
                  </ImageAdd>
                </ImageContainer>
              )}
            </EquipmentDetailContainer>
            <SubminPostContainer>
              <Button submit post onClick={setFormData} disabled={isDisabled}>
                {STRING.REQUEST_NAME[type]} 완료
              </Button>
            </SubminPostContainer>
          </AddEquipmentArticle>
        </AddEquipmentWrapper>
      )}
    </>
  );
}

const ImageContainer = styled.div`
  margin-left: 8.8125rem;
  height: 29.75rem;

  section {
  }

  label:first-child {
    height: 23.75rem;
    background-color: white;
    border: 1px solid ${props => props.theme.color.grey.brandColor2};
    border-radius: 0.5rem;
    margin: 1.0625rem 0;
  }

  img {
    width: 23.75rem;
    height: 17.8125rem;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  width: 30.875rem;
  height: 10rem;
  background: ${props => props.theme.color.grey.brandColor1};
  border-radius: 0.25rem;
  border: none;
  resize: none;
  margin: auto;
`;

const EquipmentLeftContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 3.125rem;
`;

const EquipmentDetailContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: center;
  min-height: 30.625rem;
`;

const AddEquipmentArticle = styled.article`
  ${props => props.theme.FlexCol};
  width: 100%;
  padding: 4.5rem 8.75rem;
  justify-content: center;
`;

const AddEquipmentWrapper = styled.section`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const SubminPostContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  padding-top: 1rem;
  width: 100%;
`;
