import React from 'react';
import styled from 'styled-components';
import Input from '../../elements/Input';

export default function RequestShow() {
  return (
    <RequestShowContainer>
      <RequestShowTitle>
        <Title>전체</Title>
        <SearchSelect>
          <Input placeholder="검색어를 입력해주세요 (신청자,담당부서 등)" />
          <Select>
            <option value="처리전">처리전</option>
            <option value="처리중">수리중</option>
            <option value="처리 완료">처리 완료</option>
          </Select>
        </SearchSelect>
      </RequestShowTitle>
    </RequestShowContainer>
  );
}

const RequestShowContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0.0579rem solid ${props => props.theme.color.grey.brandColor2};
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.75rem;
  margin-top: 1.75rem;
  margin-left: 2.5rem;
`;

const SearchSelect = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  input {
    width: 28.375rem;
    height: 2.5rem;
    background-color: ${props => props.theme.color.grey.brandColor1};
    padding: 0;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 5.8125rem;
  height: 2.5rem;
`;
