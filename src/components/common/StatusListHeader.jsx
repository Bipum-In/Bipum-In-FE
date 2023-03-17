import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';
import Input from '../../elements/Input';

export default function StatusListHeader({
  setSelectName,
  selectBoxList,
  containerHeaderRef,
  onChangeStatus,
  children,
}) {
  return (
    <RequestShowTitle ref={containerHeaderRef}>
      <Title>{setSelectName()}</Title>
      <SearchSelect>
        {children}
        <SearchContainer>
          <SearchIconContainer>
            <Search />
          </SearchIconContainer>
          <Input placeholder="검색어를 입력해주세요 (신청자,담당부서 등)" />
        </SearchContainer>
        <SelectWrapper>
          <Select onChange={onChangeStatus}>
            {selectBoxList.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <SelectArrow>
            <ArrowDown />
          </SelectArrow>
        </SelectWrapper>
      </SearchSelect>
    </RequestShowTitle>
  );
}

const RequestShowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.75rem;
  margin-top: 1.75rem;
  margin-left: 2.5rem;
`;

const SearchSelect = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  margin-top: 1.5rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  width: 28.375rem;
  height: 2.5rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  margin: 0;
  margin-right: 1.625rem;
  border-radius: 0.5rem;

  input {
    font-size: 1rem;
  }
`;

const SearchIconContainer = styled.div`
  padding: 0 1rem;
`;

const Select = styled.select`
  position: relative;
  width: 5.8125rem;
  height: 2.5rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border: 1px solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  text-align-last: center;
  text-align: center;
  appearance: none;
  padding: 5px 10px;
  padding-right: 25px;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 5.8125rem;
  height: 2.5rem;
  margin-right: 1.9375rem;
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  height: 15px;
  width: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    width: 15px;
    height: 15px;
    * {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
`;
