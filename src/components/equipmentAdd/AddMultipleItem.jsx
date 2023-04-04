import Button from 'elements/Button';
import Input from 'elements/Input';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';

export default function AddMultipleItem() {
  const [excel, setExcel] = useState({ data: null, sheetName: null, path: '' });

  const readExcel = e => {
    let { files, value } = e.target;
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      const sheetName = workBook.SheetNames;
      console.log(sheetName);

      const excels = workBook.SheetNames.map(sheetName =>
        XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      );
      setExcel({ data: excels, sheetName, path: value });
    };
    reader.readAsBinaryString(files[0]);
  };

  const DownLoadToExcel = () => {
    const csvData = [
      {
        카테고리: '노트북',
        제품명: 'MacBook Pro',
        시리얼_번호: 'ms11223-344kj55',
        협력업체: '',
        부서명: '',
        사원명: '',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'test.xlsx');
  };
  console.log(excel);
  return (
    <MultipleWrapper>
      <MultipleHeaderContainer>
        <InputFileContainer>
          <InputFile>
            파일 선택
            <Input
              key={uuidv4()}
              type="file"
              setState={readExcel}
              accept=".csv,.xlsx,.xls,.numbers"
            />
          </InputFile>
          <InputFilePath>{excel.path || ':'}</InputFilePath>
        </InputFileContainer>
        <Button onClick={DownLoadToExcel}>양식 다운로드</Button>
      </MultipleHeaderContainer>
      <ul>
        {excel?.data?.map((row, index) =>
          // <div>{excel.sheetName[index]}</div>
          row.map(column => (
            <li>{`카테고리:${column['카테고리']} | 제품명:${column['제품명']} | 시리얼_번호:${column['시리얼_번호']} | 협력업체:${column['협력업체']} | 부서명:${column['부서명']} | 사원명:${column['사원명']}`}</li>
          ))
        )}
      </ul>
    </MultipleWrapper>
  );
}

const MultipleWrapper = styled.section`
  width: 100%;
  padding: 2rem 3rem;
`;

const MultipleHeaderContainer = styled.header`
  ${props => props.theme.FlexRow}
  justify-content: space-between;

  button {
    color: white;
    background-color: ${props => props.theme.color.blue.brandColor6};
  }
`;

const InputFileContainer = styled.div`
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter}
`;

const InputFile = styled.label`
  border: 0;
  border-radius: 0.375rem;
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  color: ${props => props.theme.color.blue.brandColor6};
  width: 5rem;
  height: 2.8125rem;
  font-weight: 600;
  font-size: 1rem;
  background-color: #e4f0ff;
  cursor: pointer;

  input {
    display: none;
  }
`;

const InputFilePath = styled.div`
  display: flex;
  align-items: center;
  min-width: 20rem;
  height: 2.8125rem;
  border: 3px solid #e4f0ff;
`;
