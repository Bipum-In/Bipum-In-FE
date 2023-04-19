import { Suspense, lazy } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as SearchIcon } from 'styles/commonIcon/search.svg';

import Input from 'elements/Input';
import PLACEHOLDER from 'constants/placeholder';
const SearchList = lazy(() => import('./SearchList'));

export default function Search({
  search,
  searchValue,
  searchOutsideRef,
  onChagneSearch,
  onSearchDetail,
}) {
  const searchData = search?.supplySearchDtoList;
  const searchArrayValue = searchData && Object.values(searchData);
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
        <Suspense fallback={null}>
          <SearchList
            searchList={searchArrayValue}
            onSearchDetail={onSearchDetail}
          />
        </Suspense>
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
