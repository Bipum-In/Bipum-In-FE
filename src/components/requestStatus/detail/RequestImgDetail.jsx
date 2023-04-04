import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ModalImgCarousel from './ModalImgCarousel';

export default function RequestImgDetail({
  text,
  image,
  editMode,
  onDelete,
  onChangeimge,
}) {
  return (
    <>
      <EquipmentImageContainer>
        <span>{text}</span>
        <ModalImgCarousel
          image={image}
          editMode={editMode}
          onDelete={onDelete}
        />
      </EquipmentImageContainer>
      {editMode && (
        <>
          <ImageinputFile>
            파일 선택하기
            <input
              as={'input'}
              key={uuidv4()}
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={onChangeimge}
              multiple
            />
          </ImageinputFile>
        </>
      )}
    </>
  );
}

const EquipmentImageContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  padding-bottom: 1rem;
  overflow: hidden;
  span {
    padding-bottom: 1rem;
  }
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
  margin-bottom: 1rem;
  cursor: pointer;
  input {
    display: none;
  }
`;
