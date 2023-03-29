import React from 'react';
import styled from 'styled-components';
import ImageAdd from '../../equipmentAdd/single/ImageAdd';

export default function DetailImage({ detail, preview, onChangeImage }) {
  const { image } = detail.supplyDetail;
  return (
    <ImgContainer>
      {image ? (
        <img src={image} alt="Img" />
      ) : (
        <ImageAdd preview={preview} onChangeimge={onChangeImage} />
      )}
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  display: flex;
  margin-right: 5.9375rem;

  img {
    width: 23.25rem;
    height: 23.25rem;
    border: 1px solid ${props => props.theme.color.grey.brandColor2};
    border-radius: 0.375rem;
  }
`;
