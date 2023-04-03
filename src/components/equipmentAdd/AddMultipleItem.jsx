import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function AddMultipleItem() {
  const [excel, setExcel] = useState(null);

  const readExcel = e => {
    let input = e.target;
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      const sheetName = workBook.SheetNames;

      let rows = XLSX.utils.sheet_to_json(workBook.Sheets['개인경비신청']);
      setExcel([...rows]);
      // const excels = workBook.SheetNames.map(sheetName =>
      //   XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      // );

      // console.log(excels);
    };
    reader.readAsBinaryString(input.files[0]);
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

  return (
    <div>
      <button onClick={DownLoadToExcel}>양식 다운로드</button>
      <input type="file" onChange={readExcel}></input>
      <ul>
        {excel?.map(v => (
          <li>{`월:${v['월']} | 회사:${v['회사']} | Level 1:${v['Level 1']} | Level 2:${v['Level 2']} | 사용구분:${v['사용구분']}`}</li>
        ))}
      </ul>
    </div>
  );
}
