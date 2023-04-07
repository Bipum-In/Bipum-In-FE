import ALERT from 'constants/alert';
import ARRAY from 'constants/array';
import alertModal, { alertModalButton } from 'utils/alertModal';

const Valid = {
  imgLengthCheck(img, length) {
    if (img.length > length) {
      alertModal(false, ALERT.CHECK_IMAGE_LENGTH(length), 2);
      return false;
    }

    return true;
  },

  excelSheetCheck(sheetName, excel) {
    const errorArray = validRoopExcelSheet(sheetName, excel);

    if (errorArray.length) {
      alertModalButton(false, ALERT.CHECK_EXCEL_SHEET(errorArray));
      return false;
    }

    return true;
  },
};

function validRoopExcelSheet(sheetNames, excel) {
  const result = [];

  sheetNames.forEach((sheetName, index) => {
    const errorArray = validExcelSheet(excel[index]);
    if (errorArray.length) {
      result.push(`
      sheet: ${sheetName} 
      cell : ${errorArray.join(', ')}
      `);
    }
  });

  return result;
}

function validExcelSheet(excel) {
  const errorArray = [];
  const columnArray = ARRAY.EXCEL_COLUMN;
  const columnTitleArray = ARRAY.MULTIPLE_HEADER;

  let columnCnt = 0;
  let rowCnt = 0;

  const parseEmptyColumn = excel.filter(column => new Set(column).size !== 1);
  const rowLength = parseEmptyColumn.length;
  while (columnCnt < columnArray.length) {
    const checkRow = parseEmptyColumn[rowCnt][columnCnt];

    if (checkRow) {
      if (rowCnt === 0 && columnTitleArray[columnCnt] !== checkRow) {
        errorArray.push(`${columnArray[columnCnt]}${rowCnt + 11}`);
      }

      rowCnt++;
    }

    if (!checkRow) {
      if (rowCnt === 0 || columnCnt < 3) {
        errorArray.push(`${columnArray[columnCnt]}${rowCnt + 11}`);
      }

      rowCnt++;
    }

    if (rowCnt === rowLength) {
      columnCnt++;
      rowCnt = 0;
    }
  }

  return errorArray;
}

export default Valid;
