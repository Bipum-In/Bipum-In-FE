import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from 'styles/commonIcon/search.svg';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';
import Input from 'elements/Input';
import Button from 'elements/Button';
import PLACEHOLDER from 'constants/placeholder';

export default function StatusListHeader({
  setSelectName,
  selectBoxList,
  containerHeaderRef,
  status,
  setStatus,
  keyword,
  setKeyword,
  children,
}) {
  return (
    <RequestShowTitle ref={containerHeaderRef}>
      <Title>{setSelectName}</Title>
      <SearchSelect>
        {children}
        <SearchContainer>
          <SearchIconContainer>
            <Button>
              <Search />
            </Button>
          </SearchIconContainer>
          <Input
            value={keyword}
            setState={setKeyword}
            placeholder={PLACEHOLDER.ENTER_INPUT(
              '검색어를',
              '(신청자,담당부서 등)'
            )}
          />
        </SearchContainer>
        {setStatus && (
          <SelectWrapper>
            <Select value={status} onChange={setStatus}>
              {selectBoxList.name.map((value, index) => (
                <option key={value} value={selectBoxList.type[index]}>
                  {value}
                </option>
              ))}
            </Select>
            <SelectArrow>
              <ArrowDown />
            </SelectArrow>
          </SelectWrapper>
        )}
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
  font-size: 1.25rem;
  margin-top: 1.75rem;
  margin: 1.75rem 2.5rem 0 2.5rem;
  white-space: nowrap;
`;

const SearchSelect = styled.div`
  ${props => props.theme.FlexRow}
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
`;

const SearchContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  max-width: 28.375rem;
  width: 100%;
  height: 2.125rem;
  background-color: ${props => props.theme.color.grey.brandColor1};
  margin: 0;
  margin-right: 1rem;
  border-radius: 0.5rem;

  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }

  @media (max-width: 64.5625rem) {
    width: 15rem;

    input::-webkit-input-placeholder {
      color: transparent;
    }
    input:-ms-input-placeholder {
      color: transparent;
    }
  }
`;

const SearchIconContainer = styled.div`
  padding: 0 1rem;
  button {
    padding: 0;
  }
`;

const Select = styled.select`
  position: relative;
  width: 100%;
  height: 2.125rem;
  color: ${props => props.theme.color.blue.brandColor6};
  background-color: ${props => props.theme.color.blue.brandColor1};
  border: 0.0625rem solid ${props => props.theme.color.blue.brandColor3};
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-align-last: center;
  text-align: center;
  appearance: none;
  padding: 0.3125rem 0.625rem;
  padding-right: 1.5625rem;

  @media (max-width: 64.5625rem) {
    color: transparent;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 5.6rem;
  height: 2.5rem;
  margin-right: 1.9375rem;

  @media (max-width: 64.5625rem) {
    justify-content: end;
    width: 2rem;
    color: transparent;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 0.625rem;
  height: 0.9375rem;
  width: 0.9375rem;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    width: 0.9375rem;
    height: 0.9375rem;
    * {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
`;
