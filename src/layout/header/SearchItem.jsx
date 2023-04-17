import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function SearchItem({ search, onSearchDetail }) {
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
        <ItemContainer key={uuidv4()} onClick={() => onSearchDetail(item)}>
          {parseData(item)
            .filter(value => value !== undefined)
            .map(({ key, value }) =>
              key === 'image' ? (
                <Image key={uuidv4()} src={value} alt="item-image" />
              ) : (
                <Item key={uuidv4()} status={value}>
                  <StatusColor status={value} />
                  <TextOverflow>{value || '-'}</TextOverflow>
                </Item>
              )
            )}
        </ItemContainer>
      ))}
    </SearchItemContainer>
  );
}

const SearchItemContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 0.5rem;
`;

const ItemContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0 1rem;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 5rem;
  height: 5rem;

  ${props =>
    props.status === '승인' &&
    css`
      width: 3rem;
      height: 2rem;
      justify-content: center;
      color: ${props => props.theme.color.accpet};
      border: 1px solid ${props => props.theme.color.accpet};
      border-radius: 0.5rem;
    `}

  ${props =>
    props.status === '거절' &&
    css`
      width: 3rem;
      height: 2rem;
      justify-content: center;
      color: ${props => props.theme.color.reject};
      border: 1px solid ${props => props.theme.color.reject};
      border-radius: 0.5rem;
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      width: 3rem;
      height: 2rem;
      justify-content: center;
      color: ${props => props.theme.color.remove};
      border: 1px solid ${props => props.theme.color.remove};
      border-radius: 0.5rem;
    `}
`;

const TextOverflow = styled.div`
  display: -webkit-box;
  line-height: 1.2;
  max-width: 5rem;
  max-height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StatusColor = styled.div`
  display: none;
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.5rem;
  ${props =>
    props.status === '재고' &&
    css`
      display: block;
      background-color: #d23737;
    `};

  ${props =>
    props.status === '사용중' &&
    css`
      display: block;
      background-color: #37d259;
    `};

  ${props =>
    props.status === '수리중' &&
    css`
      display: block;
      background-color: #ff8502;
    `};
  border-radius: 50%;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
`;
