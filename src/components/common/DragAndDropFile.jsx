import styled from 'styled-components';

import { Keyframe } from 'styles/keyframes';
import { ReactComponent as Excel } from 'styles/commonIcon/excel.svg';
import { ReactComponent as DragIcon } from 'styles/commonIcon/drag.svg';
import { ReactComponent as CurrentImg } from 'styles/commonIcon/dragImg.svg';
import { ReactComponent as EmptyImg } from 'styles/commonIcon/emptyImg.svg';

export default function DragAndDropFile({
  isCurrent,
  data,
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
              <span>여기에 엑셀 파일을 드래그앤드롭 해주세요.</span>
            </IsCurrentContainer>
          ) : (
            <IsCurrentContainer>
              <EmptyImg />
              <span>형식에 맞지 않은 엑셀 파일입니다.</span>
            </IsCurrentContainer>
          )}
        </CurrentImgContainer>
      )}
      <DefaultImgWrapper onClick={onChangeInputFile}>
        <Excel />
        <DefulatDesc>
          {invalidFile
            ? '형식에 맞지 않은 엑셀 파일입니다'
            : '클릭또는 드래그해\n엑셀 파일을 추가해주세요.'}
        </DefulatDesc>
      </DefaultImgWrapper>
    </>
  );
}

const DefaultImgWrapper = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  gap: 1.5rem;
  &:before {
    content: '';
    ${props => props.theme.wh100};
    ${props => props.theme.AbsoluteTL};
    ${props => props.theme.CursorActive};
  }
`;

const DefulatDesc = styled.span`
  color: ${props => props.theme.color.grey.brandColor4};
  padding-top: 1.125rem;
  white-space: pre-line;
  font-size: 1.75rem;
  font-weight: 500;
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
