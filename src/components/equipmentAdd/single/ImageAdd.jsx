import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Keyframe } from 'styles/keyframes';
import { ReactComponent as DefaultImage } from 'styles/commonIcon/addImgIcon2.svg';
import { ReactComponent as DragIcon } from 'styles/commonIcon/drag.svg';

import ImageCarousel from '../../common/ImageCarousel';
import { v4 as uuidv4 } from 'uuid';

export default function ImageAdd({
  preview,
  onChangeimge,
  onDeleteImage,
  children,
}) {
  const [isCurrent, setIsCurrent] = useState('');
  const [invalidFile, setInvalidFile] = useState(false);
  const inputRef = useRef(null);

  const handlerInputFile = () => inputRef.current.click();
  const handleDragOver = useCallback(e => e.preventDefault(), []);
  const handleDragLeave = useCallback(() => setIsCurrent(''), []);
  const handleDragEnterOrDrop = useCallback(
    e => {
      e.preventDefault();
      const files = Array.from(
        e.type === 'drop' ? e.dataTransfer.files : e.dataTransfer.items
      );

      const filteredFiles = Array.from(files).filter(file =>
        ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(
          file.type
        )
      );

      if (e.type === 'drop') {
        if (filteredFiles.length) {
          const event = { target: { files: filteredFiles } };
          onChangeimge(event);
          setInvalidFile(false);
        } else {
          setInvalidFile(true);
        }
        setIsCurrent('');
      } else {
        setIsCurrent(filteredFiles.length === files.length);
      }
    },
    [onChangeimge]
  );

  return (
    <ImageWrapper>
      {children}
      <ImageContainer
        preview={preview}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnterOrDrop}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnterOrDrop}
        isCurrent={isCurrent}
      >
        {isCurrent !== '' && (
          <CurrentImgContainer current={isCurrent}>
            {isCurrent
              ? '이미지를 여기에 드롭하세요.'
              : '형식에 맞지 않은 파일입니다'}
          </CurrentImgContainer>
        )}
        {!preview.length && (
          <DragAndDropIcon>
            <DragIcon />
          </DragAndDropIcon>
        )}
        {preview.length ? (
          <ImageCarousel imageUrlList={preview} onDeleteImage={onDeleteImage} />
        ) : (
          <DefaultImgWrapper onClick={handlerInputFile}>
            <DefaultImage />
            <DefulatDesc>
              {invalidFile
                ? '형식에 맞지 않은 파일입니다'
                : '클릭또는 드래그해\n사진을 추가해주세요.'}
            </DefulatDesc>
          </DefaultImgWrapper>
        )}
      </ImageContainer>
      <ImageinputFile>
        파일 선택하기
        <input
          ref={inputRef}
          as={'input'}
          key={uuidv4()}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={onChangeimge}
          multiple
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

const ImageContainer = styled.label`
  position: relative;
  display: flex;
  ${props => props.theme.FlexCenter};
  width: 100%;
  height: 23.75rem;
  border-radius: 0.5rem;
  margin: 1.375rem 0;
  background-color: ${props =>
    props.preview ? 'transperant' : props.theme.color.grey.brandColor1};
`;

const DefaultImgWrapper = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  &:before {
    content: '';
    ${props => props.theme.wh100};
    ${props => props.theme.AbsoluteTL};
    ${props => props.theme.CursorActive};
  }
`;

const DefulatDesc = styled.span`
  font-size: 1.125rem;
  padding-top: 1.125rem;
  white-space: pre-line;
  text-align: center;
  color: ${props => props.theme.color.grey.brandColor4};
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

const CurrentImgContainer = styled.div`
  position: absolute;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.wh100};
  ${props => props.theme.AbsoluteTL};
  border: 3px dashed
    ${props =>
      props.current
        ? `${props.theme.color.blue.brandColor6}`
        : `${props.theme.color.reject}`};
  background-color: ${props =>
    props.current ? `rgb(20 121 255 / 35%)` : `rgb(255 99 71 / 35%)`};
  backdrop-filter: blur(2px);
  border-radius: 0.5rem;
  opacity: 0;
  animation: ${Keyframe.fadeIn} 0.2s ease-in-out forwards;
`;
