import styled, { css } from 'styled-components';
import { getEncryptionStorage } from 'utils/encryptionStorage';
import { v4 as uuidv4 } from 'uuid';

export default function SearchItem({ search, onSearchDetail }) {
  const data = [
    { key: 'image', width: '' },
    { key: 'requestType', width: '' },
    { key: 'categoryName', width: '5.25rem' },
    { key: 'modelName', width: '9rem' },
    { key: 'serialNum', width: '6rem' },
    { key: 'empName', width: '3.625rem' },
    { key: 'deptName', width: '5.5rem' },
    { key: 'status', width: '4.5rem' },
    { key: 'acceptResult', width: '' },
  ];
  const { isAdmin } = getEncryptionStorage();
  const parseData = item =>
    data.map(({ key, width }) => {
      if (!isAdmin && (key === 'empName' || key === 'deptName')) {
        return undefined;
      }

      return key in item ? { key, value: item[key], width } : undefined;
    });

  return (
    <SearchItemContainer>
      {search.map(item => (
        <ItemContainer key={uuidv4()} onClick={() => onSearchDetail(item)}>
          {parseData(item)
            .filter(value => value !== undefined)
            .map(({ key, value, width }) => {
              return key === 'image' ? (
                <Image key={uuidv4()} src={value} alt="item-image" />
              ) : (
                <Item key={uuidv4()} status={value} width={width}>
                  <StatusColor status={value} />
                  <TextOverflow>{value || '-'}</TextOverflow>
                </Item>
              );
            })}
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
  gap: 1.25rem;
  padding: 0 1rem;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: ${props => (props.width ? props.width : 'auto')};
  height: 5rem;

  ${props =>
    (props.status === '재고' ||
      props.status === '사용중' ||
      props.status === '수리중') &&
    css`
      justify-content: center;
      width: auto;
      height: 1.875rem;
      background-color: ${props => props.theme.color.blue.brandColor1};
      padding: 0.5rem;
      border-radius: 0.5rem;
      font-weight: 400;
      font-size: 12px;
    `};

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

    ${props =>
    (props.status === '반납 요청' ||
      props.status === '수리 요청' ||
      props.status === '비품 요청' ||
      props.status === '보고서 결재') &&
    css`
      width: 4.5rem;
      height: 2.0625rem;
      justify-content: center;
      color: ${props => props.theme.color.blue.brandColor7};
      border: 1px solid ${props => props.theme.color.blue.brandColor7};
      border-radius: 0.25rem;
      font-weight: 500;
      font-size: 0.875rem;
    `}
`;

const TextOverflow = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
`;
