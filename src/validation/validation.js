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

  inputCheck(strArr, regex) {
    for (let i = 0; i < strArr.length; i++) {
      if (!isValidInput(strArr[i][0], regex)) {
        alertModal(
          false,
          ALERT.CHECK_INPUT_KO_AND_ENG_AND_NUM(strArr[i][1]),
          2
        );
        return false;
      }
    }

    return true;
  },

  inputByteCheck(str, length) {
    if (getByteLength(str) > length) {
      return false;
    }
    return true;
  },
};

function validRoopExcelSheet(sheetNames, excel) {
  const result = [];
  const flatExcel = excel
    .map(sheet => sheet.filter((_, index) => index))
    .flat();
  const parseEmptyColumn = flatExcel.filter(
    column => new Set(column).size !== 1
  );

  if (parseEmptyColumn.length > 100) {
    result.push(`총 100개 이하의 column만 등록해야 합니다.`);
    return result;
  }

  if (parseEmptyColumn.length < 2) {
    result.push(`2개 이상의 column을 등록해야 합니다.`);
    return result;
  }

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

function isCompleteHangul(char) {
  const charCode = char.charCodeAt(0);
  return charCode >= 0xac00 && charCode <= 0xd7a3;
}

function isValidInput(str, regex) {
  const matched = str.match(regex);
  return matched && matched.length === str.length;
}

function getByteLength(str) {
  let byteLength = 0;

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    if (charCode <= 0x7f) {
      // ASCII 문자
      byteLength += 1;
    } else if (charCode <= 0x7ff) {
      // 라틴 문자 등
      byteLength += 2;
    } else if (
      (charCode >= 0xac00 && charCode <= 0xd7a3) ||
      (charCode >= 0x800 && charCode <= 0xffff)
    ) {
      // 한글 및 기타 문자
      byteLength += 2;
    } else {
      byteLength += 3; // UTF-8에서 한글을 3바이트로 계산하는 경우
    }
  }

  return byteLength;
}

export default Valid;
