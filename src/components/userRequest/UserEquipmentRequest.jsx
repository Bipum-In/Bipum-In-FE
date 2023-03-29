import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';
import { styles } from '../common/commonStyled';
import SelectCategoryList from '../equipmentAdd/single/SelectCategoryList';
import Axios from '../../api/axios';
import STRING from '../../constants/string';
import ImageAdd from '../equipmentAdd/single/ImageAdd';
const axios = new Axios(process.env.REACT_APP_SERVER_URL);
const requestData = {
  supplyId: '',
  categoryId: '',
  content: '',
  requestType: '',
  multipartFile: '',
  storedImageURLs: '',
};

export default function UserEquipmentRequest({
  type,
  category,
  largeCategory,
}) {
  const [messageValue, setMessageValue] = useState('');
  const [checkSallCategory, setCheckSallCategory] = useState(false);
  const [smallCategory, setSmallCategory] = useState(null);
  const parseLargeCategory = useRef(largeCategory.filter((_, i) => i)).current;

  const parseCategoryData = (name, getCategory) => {
    return getCategory.filter(item => item.largeCategory === name);
  };

  const handleChangeLargeCategory = e => {
    const { ko, eng } = JSON.parse(e.target.value);
    setSmallCategory(parseCategoryData(ko, category));
  };

  const handleChangeSmallCategory = e => {
    const { ko } = JSON.parse(e.target.value);
    requestData.categoryId = ko;
    setCheckSallCategory(requestData.categoryName);
  };

  const setFormData = e => {
    const formDataKeyArray =
      type === 'SUPPLY'
        ? ['categoryId', 'requestType', 'content', 'storedImageURLs']
        : [
            'supplyId',
            'requestType',
            'content',
            'multipartFile',
            'storedImageURLs',
          ];

    requestData.requestType = type;
    requestData.content = messageValue;

    const formData = new FormData();
    formDataKeyArray.forEach(formDataKey => {
      formData.append(formDataKey, requestData[formDataKey]);
    });

    sendFormData(formData);
  };

  const sendFormData = formData => axios.post(`/api/requests`, formData);

  const [preview, setPreview] = useState('');
  const [formImage, setFormformImage] = useState(null);

  const handleChangeimge = e => {
    const img = e.target.files;
    setFormformImage(img);
    setPreviewImage(img);
  };

  const handleDeleteImage = e => {};

  const setPreviewImage = images => {
    const previewArray = [];

    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        previewArray.push(reader.result);

        if (previewArray.length === images.length) {
          setPreview(previewArray);
        }
      };

      reader.readAsDataURL(images[i]);
    }
  };
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
                      optionNullName={['대분류', '소분류']}
                      optionKey={['name', 'categoryName']}
                      optionValueKey={['name', 'categoryId']}
                      onChangeCategory={[
                        handleChangeLargeCategory,
                        handleChangeSmallCategory,
                      ]}
                    />
                  </styles.SelectCaregoryConteiner>
                </styles.TypeBox>
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
              <ImageContainer>
                <ImageAdd
                  preview={preview}
                  onChangeimge={handleChangeimge}
                  onDeleteImage={handleDeleteImage}
                >
                  <styles.TypeTitle requiredinput="true">
                    사진 첨부
                  </styles.TypeTitle>
                </ImageAdd>
              </ImageContainer>
            </EquipmentDetailContainer>
            <SubminPostContainer>
              <Button submit post onClick={setFormData}>
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

  article {
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

  /* svg {
    width: 23.75rem;
    height: 17.8125rem;
  } */
`;

const TextArea = styled.textarea`
  width: 30.875rem;
  height: 10rem;
  background: ${props => props.theme.color.grey.brandColor1};
  border: none;
  padding: 0.5rem;
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
