import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../styles/commonIcon/search.svg';

export default function header() {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <ItemContainer>
          <SearchContainer>
            <SearchIconContainer>
              <Search />
            </SearchIconContainer>
            <SearchInput placeholder="검색어를 입력하세요." />
          </SearchContainer>
        </ItemContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7.5rem;
  z-index: 0;
  background-color: ${props => props.theme.color.blue.brandColor7};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100vw - 250px);
  margin-left: auto;
  height: 100%;
`;

const ItemContainer = styled.div`
  margin: 0 3.25rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  width: 28.375rem;
  height: 3.125rem;
  background-color: white;
  border-radius: 0.5rem;
`;

const SearchIconContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 1.875rem;
  height: 1.875rem;
  margin: 0 0.8125rem 0 1.3125rem;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  line-height: 1.3125rem;
  font-size: 1.125rem;
  color: ${props => props.theme.color.grey.brandColor7};
`;
