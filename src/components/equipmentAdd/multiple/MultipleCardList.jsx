import ARRAY from 'constants/array';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import MultipleColumnDelete from './commonItem/MultipleColumnDelete';
import MultipleImage from './commonItem/MultipleImage';

export default function MultipleCardList({
  excel,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  return (
    <MultipleBodyContainer>
      {excel.data &&
        excel.data[excel.sheetItem]?.map((column, columnIndex) => (
          <CardContainer key={uuidv4()}>
            <ImageWrapper>
              <MultipleImage
                excel={excel}
                index={columnIndex}
                column={column}
                onAddImage={onAddImage}
                onDeleteImage={onDeleteImage}
                onImageDetail={onImageDetail}
              />
            </ImageWrapper>
            <ColumnDeleteWrapper>
              <MultipleColumnDelete
                index={columnIndex}
                onDeleteRow={onDeleteRow}
              />
            </ColumnDeleteWrapper>
            {ARRAY.MULTIPLE_HEADER.map((header, headerIndex) => (
              <ItemContainer key={uuidv4()}>
                <span>{ARRAY.MULTIPLE_HEADER[headerIndex]}</span>
                {column[header] || '-'}
              </ItemContainer>
            ))}
          </CardContainer>
        ))}
    </MultipleBodyContainer>
  );
}

const MultipleBodyContainer = styled.section`
  ${props => props.theme.FlexRow}
  flex-wrap: wrap;
  width: 100%;
  height: calc(50.5344rem - 6.7112rem);
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
`;

const CardContainer = styled.div`
  position: relative;
  max-width: 20rem;
  width: 100%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  ${props => props.theme.Boxshadow}

  &:hover > article {
    opacity: 1;
  }

  @media (max-width: 60.7813rem) {
    max-width: 30rem;
  }
`;

const ImageWrapper = styled.article`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  img {
    width: 12rem;
    height: 12rem;
  }

  svg,
  label {
    width: 12rem;
    height: 12rem;
  }

  @media (max-width: 60.7813rem) {
    img {
      width: 20rem;
      height: 20rem;
    }

    svg,
    label {
      width: 20rem;
      height: 20rem;
    }
  }
`;

const ColumnDeleteWrapper = styled.article`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  opacity: 0;
`;

const ItemContainer = styled.article`
  span {
    display: inline-block;
    width: 5rem;
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }
`;
