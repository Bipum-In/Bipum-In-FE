import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddImgIcon } from 'styles/commonIcon/addImg.svg';
import Button from 'elements/Button';
import Input from 'elements/Input';
import { v4 as uuidv4 } from 'uuid';

export default function MultipleHeader({
  inputRef,
  downLoadToExcel,
  onReadExcel,
  onAddMultiData,
  onAddMultiImage,
}) {
  return (
    <MultipleHeaderContainer>
      <SheetListContainer>
        <MultipleHeaderTitle>복수 등록</MultipleHeaderTitle>
        <Button onClick={downLoadToExcel}>엑셀 양식 다운로드</Button>
        <InputFile>
          엑셀 첨부
          <Input
            inputRef={inputRef}
            key={uuidv4()}
            type="file"
            onChange={onReadExcel}
            accept=".xlsx"
          />
        </InputFile>
      </SheetListContainer>
      <InputFileContainer>
        <Button mainBtn="border" onClick={onAddMultiImage}>
          <AddImgIcon />
          사진 자동 첨부
        </Button>
        <Button mainBtn="fill" onClick={onAddMultiData}>
          복수 등록 완료
        </Button>
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
  gap: 0.5rem;
  button {
    height: 2.3125rem;
    font-weight: 600;
    font-size: 1rem;
  }

  button:nth-child(2) {
    border: 0.0625rem solid #3aa471;
    color: #3aa471;
    background-color: white;
  }
`;

const InputFileContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
  gap: 0.5rem;
  button {
    height: 2.1875rem;
  }
  svg {
    width: 1.1875rem;
    height: 1.1875rem;
    path {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
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
