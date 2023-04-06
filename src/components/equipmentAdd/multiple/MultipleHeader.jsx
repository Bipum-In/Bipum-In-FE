import React from 'react';
import styled, { css } from 'styled-components';

import Button from 'elements/Button';
import Input from 'elements/Input';

import { v4 as uuidv4 } from 'uuid';

export default function MultipleHeader({
  sheetList,
  readExcel,
  downLoadToExcel,
  onChangeSheet,
}) {
  return (
    <MultipleHeaderContainer>
      <SheetListContainer>
        <MultipleHeaderTitle>복수 등록</MultipleHeaderTitle>
        <SheetList>
          {sheetList?.map((sheetItem, index) => (
            <Button
              key={uuidv4()}
              multipleStyle={sheetItem.status}
              value={index}
              onClick={onChangeSheet}
            >{`${sheetItem.sheetName} 시트`}</Button>
          ))}
        </SheetList>
      </SheetListContainer>
      <InputFileContainer>
        <Button onClick={downLoadToExcel}>사진 자동 등록</Button>
        <Button onClick={downLoadToExcel}>비품 추가</Button>
        <Button onClick={downLoadToExcel}>엑셀 양식 다운로드</Button>
        <InputFile>
          엑셀 첨부
          <Input
            key={uuidv4()}
            type="file"
            setState={readExcel}
            accept=".csv,.xlsx,.xls,.numbers"
          />
        </InputFile>
      </InputFileContainer>
    </MultipleHeaderContainer>
  );
}

const MultipleHeaderContainer = styled.header`
  ${props => props.theme.FlexRow}
  justify-content: space-between;
  padding: 2rem 2.5rem;
`;

const MultipleHeaderTitle = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  margin-right: 4.0625rem;
`;

const SheetListContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
`;

const SheetList = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}

  button {
    height: 2.3125rem;
    border: 0.0625rem solid ${props => props.theme.color.blue.brandColor5};
    font-weight: 600;
    font-size: 1rem;
  }
`;

const InputFileContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  gap: 0.5rem;

  button {
    height: 2.3125rem;
    border: 0.0625rem solid ${props => props.theme.color.blue.brandColor6};
    color: white;
    background-color: ${props => props.theme.color.blue.brandColor6};
    font-weight: 600;
    font-size: 1rem;
  }

  button:nth-child(1) {
    width: 7.1875rem;
  }

  button:nth-child(2) {
    width: 5.25rem;
    margin-right: 2.5625rem;
  }

  button:nth-child(3) {
    width: 8.9375rem;
    border: 0.0625rem solid #3aa471;
    color: #3aa471;
    background-color: white;
  }
`;

const InputFile = styled.label`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  width: 5.25rem;
  height: 2.3125rem;
  border: 0;
  border-radius: 0.375rem;
  color: white;
  background-color: #3aa471;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  input {
    display: none;
  }
`;
