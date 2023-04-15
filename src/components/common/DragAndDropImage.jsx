import React from 'react';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';

import { Keyframe } from 'styles/keyframes';
import { ReactComponent as DefaultImage } from 'styles/commonIcon/addImgIcon2.svg';
import { ReactComponent as DragIcon } from 'styles/commonIcon/drag.svg';
import { ReactComponent as CurrentImg } from 'styles/commonIcon/dragImg.svg';
import { ReactComponent as EmptyImg } from 'styles/commonIcon/emptyImg.svg';

export default function DragAndDropImage({
  isCurrent,
  data,
  onDeleteImage,
  editMode,
  onChangeInputFile,
  invalidFile,
}) {
  return (
    <>
      {isCurrent !== '' && (
        <CurrentImgContainer current={isCurrent}>
          {isCurrent ? (
            <IsCurrentContainer>
              <CurrentImg />
              <span>여기에 이미지를 드래그앤드롭 해주세요.</span>
            </IsCurrentContainer>
          ) : (
            <IsCurrentContainer>
              <EmptyImg />
              <span>형식에 맞지 않은 파일입니다.</span>
            </IsCurrentContainer>
          )}
        </CurrentImgContainer>
      )}
      {!data.length && (
        <DragAndDropIcon>
          <DragIcon />
        </DragAndDropIcon>
      )}
      {data.length ? (
        <ImageCarousel
          imageUrlList={data}
          onDeleteImage={onDeleteImage}
          editMode={editMode}
        />
      ) : (
        <DefaultImgWrapper onClick={onChangeInputFile}>
          <DefaultImage />
          <DefulatDesc>
            {invalidFile
              ? '형식에 맞지 않은 파일입니다'
              : '클릭또는 드래그해\n사진을 추가해주세요.'}
          </DefulatDesc>
        </DefaultImgWrapper>
      )}
    </>
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

const CurrentImgContainer = styled.div`
  position: absolute;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  ${props => props.theme.wh100};
  ${props => props.theme.AbsoluteTL};
  border: 3px dashed white;
  background-color: ${props =>
    props.current ? `${props.theme.color.blue.brandColor6}` : `tomato`};
  color: white;
  border-radius: 0.5rem;
  opacity: 0;
  animation: ${Keyframe.fadeIn} 0.2s ease-in-out forwards;
`;

const IsCurrentContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 1rem;
  svg {
    width: 6.25rem;
    height: 6.25rem;
    path {
      fill: white;
      stroke: white;
    }
  }
`;
