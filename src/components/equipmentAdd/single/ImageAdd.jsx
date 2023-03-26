import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DefaultImage } from '../../../styles/commonIcon/defaultImage.svg';

export default function ImageAdd({ preview, onChangeimge }) {
  return (
    <ImageWrapper>
      사진첨부
      <ImageContainer>
        {preview ? (
          <PreviewImage src={preview} alt="preview" />
        ) : (
          <DefaultImage />
        )}
      </ImageContainer>
      <ImageinputFile>
        파일 선택하기
        <input
          as={'input'}
          type="file"
          accept="image/*"
          onChange={onChangeimge}
        />
      </ImageinputFile>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  ${props => props.theme.FlexCol};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3125rem;
`;

const ImageContainer = styled.div`
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
