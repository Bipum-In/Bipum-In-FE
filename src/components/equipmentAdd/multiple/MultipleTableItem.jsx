import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';

import ARRAY from 'constants/array';
import MultipleImage from './commonItem/MultipleImage';
import MultipleColumnDelete from './commonItem/MultipleColumnDelete';

export default function MultipleTableItem({
  excel,
  column,
  index,
  onDeleteRow,
  onAddImage,
  onDeleteImage,
  onImageDetail,
}) {
  return (
    <MultipleShowItem key={uuidv4()}>
      <tr>
        <td>{index + 1}</td>
        {ARRAY.MULTIPLE_HEADER.map(header => (
          <td key={uuidv4()}>{column[header] || '-'}</td>
        ))}
        <td>
          <MultipleImage
            excel={excel}
            index={index}
            column={column}
            onAddImage={onAddImage}
            onDeleteImage={onDeleteImage}
            onImageDetail={onImageDetail}
          />
        </td>
        <td>
          <MultipleColumnDelete index={index} onDeleteRow={onDeleteRow} />
        </td>
      </tr>
    </MultipleShowItem>
  );
}

const MultipleShowItem = styled.tbody`
  position: relative;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
  font-size: 1.0625rem;

  &:hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }

  &:hover td > button {
    opacity: 1;
  }
`;
