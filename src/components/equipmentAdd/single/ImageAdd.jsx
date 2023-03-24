import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DefaultImage } from '../../../styles/commonIcon/defaultImage.svg';

export default function ImageAdd({ preview, onChangeimge }) {
  return (
    <ImageContainer>
      사진첨부
      {preview ? <Image src={preview} alt="preview" /> : <DefaultImage />}
      <ImageinputFile
        as={'input'}
        type="file"
        accept="image/*"
        onChange={onChangeimge}
      />
    </ImageContainer>
  );
}

const Image = styled.img`
  background-color: ${props => props.theme.color.grey.brandColor1};
  width: 23.75rem;
  height: 23.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.375rem;
`;

const ImageContainer = styled.div`
  ${props => props.theme.FlexCol};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;

const ImageinputFile = styled.div`
  ::file-selector-button {
    margin-top: 1.4375rem;
    border: 0;
    border-radius: 6px;
    ${props => props.theme.FlexCol};
    ${props => props.theme.FlexCenter};
    color: ${props => props.theme.color.blue.brandColor6};
    width: 100%;
    height: 2.8125rem;
    font-weight: 700;
    font-size: 1.375rem;
    background-color: #e4f0ff;
    cursor: pointer;
  }
`;
