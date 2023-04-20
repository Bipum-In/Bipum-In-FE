import React from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { v4 as uuidv4 } from 'uuid';

export default function SearchList({ searchList, onSearchDetail }) {
  console.log(searchList);
  return (
    <SearchListContainer>
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
    </SearchListContainer>
  );
}

const SearchListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  background-color: white;
  ${props => props.theme.Boxshadow}
  transform: translate(0, 4rem);
  z-index: 100;
`;

const SearchListTitle = styled.header`
  width: 100%;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor5};
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;
