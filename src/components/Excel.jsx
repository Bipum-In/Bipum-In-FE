import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Excel() {
  const [excel, setExcel] = useState(null);

  const readExcel = e => {
    let input = e.target;
    let reader = new FileReader();
    reader.onload = () => {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      const sheetName = workBook.SheetNames;

      let rows = XLSX.utils.sheet_to_json(workBook.Sheets['개인경비신청']);
      console.log(rows);
      setExcel([...rows]);
      // const excels = workBook.SheetNames.map(sheetName =>
      //   XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      // );

      // console.log(excels);
    };
    reader.readAsBinaryString(input.files[0]);
  };

  return (
    <div>
      <input type='file' onChange={readExcel}></input>
      <ul>
        {excel?.map(v => (
          <li>{`월:${v['월']}  회사:${v['회사']}  Level 1:${v['Level 1']}  Level 2:${v['Level 2']}  사용구분:${v['사용구분']}`}</li>
        ))}
      </ul>
    </div>
  );
}
