import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as DeleteIcon } from 'styles/commonIcon/deleteImg.svg';
import emptyImg from 'styles/commonIcon/emptyImg.svg';

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
        <ImageWrapper>
          {image.length > 0 ? (
            image.map((img, index) => (
              <ImgContainer key={uuidv4()}>
                <ImgArr src={img} alt="equipmentImg" />
                {editMode && (
                  <DeleteImgContainer onClick={() => onDelete(index)}>
                    <DeleteIcon />
                  </DeleteImgContainer>
                )}
              </ImgContainer>
            ))
          ) : (
            <EmptyImgContainer>
              <img src={emptyImg} alt="이미지가 존재하지 않습니다" />
              {editMode && (
                <DeleteImgContainer onClick={() => onDelete()}>
                  <DeleteIcon />
                </DeleteImgContainer>
              )}
            </EmptyImgContainer>
          )}
        </ImageWrapper>
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
  ${props => props.theme.FlexCol};
  color: ${props => props.theme.color.blue.brandColor6};
  padding-bottom: 1rem;
  span {
    padding-bottom: 1rem;
  }
`;

const EmptyImgContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  background-color: ${props => props.theme.color.grey.brandColor1};
  width: 8.25rem;
  height: 8.25rem;
  margin: 0.5rem 0;
  border-radius: 0.375rem;
  img {
    width: 60%;
    height: 60%;
  }
`;

const ImageWrapper = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
  padding-top: 1rem;
`;
const ImgContainer = styled.div`
  position: relative;
  margin: 0 0 1rem 1rem;
  border: 1px solid ${props => props.theme.color.grey.brandColor1};
  border-radius: 1rem;
  max-width: 8.25rem;
  max-height: 8.25rem;
  min-width: 8.25rem;
  min-height: 8.25rem;
`;

const ImgArr = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.375rem;
  object-fit: cover;
`;

const DeleteImgContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.125rem;
  height: 1.125rem;
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
