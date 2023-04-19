import styled, { css } from 'styled-components';

import { ReactComponent as SearchIcon } from 'styles/commonIcon/search.svg';
import { v4 as uuidv4 } from 'uuid';

import Input from 'elements/Input';
import SearchItem from './SearchItem';
import PLACEHOLDER from 'constants/placeholder';

export default function Search({
  search,
  searchValue,
  searchOutsideRef,
  onChagneSearch,
  onSearchDetail,
}) {
  const searchData = search?.supplySearchDtoList;
  const searchList = searchData && Object.values(searchData);
  return (
    <SearchContainer ref={searchOutsideRef}>
      <IconContainer search="true">
        <SearchIcon />
      </IconContainer>
      <SearchInput
        value={searchValue}
        onChange={onChagneSearch}
        placeholder={PLACEHOLDER.ENTER_INPUT('검색어를')}
      />
      {searchValue && (
        <SearchList>
          {searchList?.map((data, index) => (
            <div key={uuidv4()}>
              {data.length !== 0 && (
                <SearchListTitle>
                  {index ? '요청 검색' : '재고 검색'}
                </SearchListTitle>
              )}
              <SearchItem search={data} onSearchDetail={onSearchDetail} />
            </div>
          ))}
        </SearchList>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  min-width: 25.875rem;
  width: 28.375rem;
  height: 3.125rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-right: 2rem;

  header:nth-child(1) {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  @media (max-width: ${props => props.theme.screen.desktop}) {
    margin-left: 2rem;
  }
`;

const SearchListTitle = styled.header`
  width: 100%;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

const SearchList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  background-color: white;
  ${props => props.theme.Boxshadow}
  transform: translate(0, 4rem);
  z-index: 100;
`;

const SearchInput = styled(Input)`
  border: none;
  width: 100%;
  line-height: 1.3125rem;
  font-size: 1rem;
  color: ${props => props.theme.color.grey.brandColor7};
`;

const IconContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 1.875rem;
  height: 1.875rem;
  ${props =>
    props.search === 'true' &&
    css`
      margin: 0 0.8125rem 0 1.3125rem;
    `}
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;
