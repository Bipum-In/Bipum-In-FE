import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DefaultImage } from '../../../styles/commonIcon/defaultImage.svg';
import ImageCarousel from '../../common/ImageCarousel';
import { ReactComponent as DeleteImg } from '../../../styles/commonIcon/deleteImg.svg';

export default function ImageAdd({
  preview,
  onChangeimge,
  onDeleteImage,
  children,
}) {
  return (
    <ImageWrapper>
      {children}
      <ImageContainer>
        {preview ? (
          <ImageCarousel imageUrlList={preview} onDeleteImage={onDeleteImage} />
        ) : (
          <DefaultImage />
        )}
        {/* <PreviewImage src={preview} alt="preview" /> */}
      </ImageContainer>
      <ImageinputFile>
        파일 선택하기
        <input
          as={'input'}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={onChangeimge}
          multiple
        />
      </ImageinputFile>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.section`
  ${props => props.theme.FlexCol};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3125rem;
`;

const ImageContainer = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 23.75rem;
  border-radius: 0.5rem;
  margin: 1.375rem 0;
  background-color: ${props => props.theme.color.grey.brandColor1};
  overflow: hidden;
`;

const PreviewImage = styled.img`
  ${props => props.theme.wh100};
  object-fit: cover;
`;

const ImageinputFile = styled.label`
  border: 0;
  border-radius: 0.375rem;
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  color: ${props => props.theme.color.blue.brandColor6};
  width: 100%;
  height: 2.8125rem;
  font-weight: 600;
  font-size: 1rem;
  background-color: #e4f0ff;
  cursor: pointer;

  input {
    display: none;
  }
`;
