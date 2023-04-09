import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ARRAY from 'constants/array';

import MultipleTableItem from './MultipleTableItem';

export default function MultipleTableList({
  excel,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  return (
    <MultipleBodyContainer>
      <table>
        <MultipleShowListTitle>
          <tr>
            <th>순번</th>
            {ARRAY.MULTIPLE_HEADER.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>이미지</th>
            <th />
          </tr>
        </MultipleShowListTitle>
      </table>
      <MultipleShowList>
        <table>
          {excel.data &&
            excel.data[excel.sheetItem]?.map((column, index) => (
              <MultipleTableItem
                key={uuidv4()}
                excel={excel}
                column={column}
                index={index}
                onDeleteRow={onDeleteRow}
                onAddImage={onAddImage}
                onDeleteImage={onDeleteImage}
                onImageDetail={onImageDetail}
              />
            ))}
        </table>
      </MultipleShowList>
    </MultipleBodyContainer>
  );
}

const MultipleBodyContainer = styled.section`
  width: 100%;
`;

const MultipleShowList = styled.div`
  height: 57.55vh;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
`;

const MultipleShowListTitle = styled.thead`
  height: 3.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border-top: 1px solid ${props => props.theme.color.grey.brandColor3};
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor3};
  font-weight: 600;
  font-size: 1rem;
  text-align: left;
  padding: 0 2rem;
  display: flex;
`;
