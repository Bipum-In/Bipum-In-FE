import ARRAY from 'constants/array';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import MultipleColumnDelete from './commonItem/MultipleColumnDelete';
import MultipleImage from './commonItem/MultipleImage';

export default function MultipleCardList({
  excel,
  sheetList,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  return (
    <MultipleBodyContainer>
      {!!sheetList.length &&
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
            <ItemWrapper>
              {ARRAY.MULTIPLE_HEADER.map((header, headerIndex) => (
                <ItemContainer key={uuidv4()}>
                  <span>{ARRAY.MULTIPLE_HEADER[headerIndex]}</span>
                  <span>{column[header] || '-'}</span>
                </ItemContainer>
              ))}
            </ItemWrapper>
          </CardContainer>
        ))}
    </MultipleBodyContainer>
  );
}

const MultipleBodyContainer = styled.section`
  ${props => props.theme.FlexRow}
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 16.6875rem - 6.2925rem);
  overflow-x: hidden;
  overflow-y: auto;
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

  @media (max-width: 60.8331rem) {
    display: flex;
    max-width: 38rem;
    margin: 1rem;
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
`;

const ItemWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-left: 1rem;
`;

const ColumnDeleteWrapper = styled.article`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  opacity: 0;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, auto) 1fr;
  align-items: center;
  margin-right: 1rem;
  gap: 0.5rem;

  span:first-child {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  span:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
