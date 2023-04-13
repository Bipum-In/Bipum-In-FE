import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function SearchItem({ search }) {
  const data = [
    'image',
    'requestType',
    'categoryName',
    'modelName',
    'serialNum',
    'empName',
    'deptName',
    'status',
    'acceptResult',
  ];
  const parseData = item =>
    data.map(key => (key in item ? { key, value: item[key] } : undefined));

  return (
    <SearchItemContainer>
      {search.map(item => (
        <ItemContainer key={uuidv4()}>
          {parseData(item)
            .filter(value => value !== undefined)
            .map(({ key, value }) =>
              key === 'image' ? (
                <Image key={uuidv4()} src={value} alt="item-image" />
              ) : (
                <Item key={uuidv4()}>{value}</Item>
              )
            )}
        </ItemContainer>
      ))}
    </SearchItemContainer>
  );
}

const SearchItemContainer = styled.div`
  ${props => props.theme.FlexCol};
`;

const ItemContainer = styled.div`
  ${props => props.theme.FlexRow};
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 5rem;
  height: 5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
`;
