import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as DefaultImage } from '../../../styles/commonIcon/addImgIcon2.svg';
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
        {preview ? (
          <ImageCarousel imageUrlList={preview} onDeleteImage={onDeleteImage} />
        ) : (
          <DefaultImgWrapper onClick={() => inputRef.current.click()}>
            <DefaultImage />
            <DefulatDesc>
              {invalidFile
                ? '형식에 맞지 않은 파일입니다'
                : '클릭하여 사진을 추가해주세요.'}
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

const ImageWrapper = styled.section`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 23.75rem;
  height: 30.625rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3125rem;
`;
const ImageContainer = styled.label`
  position: relative;
  display: flex;
  ${props => props.theme.FlexCenter};
  width: 100%;
  height: ${props => (props.preview ? 'auto' : '23.75rem;')};
  border-radius: 0.5rem;
  margin: 1.375rem 0;
  background-color: ${props =>
    props.preview ? 'transperant' : props.theme.color.grey.brandColor1};
  overflow: hidden;
  border: ${({ isCurrent }) => {
    if (isCurrent === '') return 'none';
    return `2px dashed ${isCurrent ? 'green' : 'red'}`;
  }};
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
