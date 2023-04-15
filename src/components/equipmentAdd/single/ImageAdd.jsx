import React, { useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import DragAndDrop from 'components/common/DragAndDrop';
import DragAndDropImage from 'components/common/DragAndDropImage';

export default function ImageAdd({
  preview,
  onChangeimge,
  onDeleteImage,
  children,
  editMode,
}) {
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  const multiple = pathname !== '/equipment-add' ? true : false;

  return (
    <ImageWrapper>
      {children}
      <DragAndDrop
        inputRef={inputRef}
        data={preview}
        type={['image/png', 'image/jpg', 'image/jpeg', 'image/gif']}
        onChangeData={onChangeimge}
      >
        <DragAndDropImage onDeleteImage={onDeleteImage} editMode={editMode} />
      </DragAndDrop>
      <ImageinputFile editMode={editMode}>
        파일 선택하기
        <input
          ref={inputRef}
          as={'input'}
          key={uuidv4()}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={onChangeimge}
          {...(multiple && { multiple: true })}
        />
      </ImageinputFile>
    </ImageWrapper>
  );
}

const DragAndDropIcon = styled.div`
  position: absolute;
  bottom: -10%;
  left: -10%;
  transition: transform 0.7s;
  ${props => props.theme.CursorActive};
  svg {
    width: 4.375rem;
  }
`;

const ImageWrapper = styled.section`
  ${props => props.theme.FlexCol};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3125rem;

  @media screen and (min-width: 738px) and (any-hover: hover) {
    &:hover ${DragAndDropIcon} {
      transform: translate3d(50px, -20px, 0);
    }
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
  cursor: pointer;
  display: ${props => (props.editMode ? 'flex' : 'none')};
  input {
    display: none;
  }
`;
