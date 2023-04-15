import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

import MultipleHeader from './multiple/MultipleHeader';
import MultipleList from './multiple/MultipleList';

import ARRAY from 'constants/array';
import Valid from 'validation/validation';
import alertModal from 'utils/alertModal';

import Axios from 'api/axios';
import ScreenViewLoading from 'components/common/ScreenViewLoading';

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export default function AddMultipleItem() {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [multiImageList, setMultiImageList] = useState([]);
  const [showImageModal, setShowImageModal] = useState({
    show: false,
    image: null,
  });
  const [excel, setExcel] = useState({
    data: null,
    sheetList: [],
    sheetName: null,
    sheetItem: 0,
  });

  const initMultiData = () => {
    setMultiImageList([]);
    setExcel({
      data: null,
      sheetList: [],
      sheetName: null,
      sheetItem: 0,
    });
  };

  const handleAddMultiData = () => {
    const deleteImageFormData = deleteFormDataImage(excel);
    const flatFormData = flatSheet(deleteImageFormData);
    const formData = parseFlatFormData(flatFormData);

    sendFormData(formData);
  };

  const handleAddMultiImage = async () => {
    const modelNameToStr = getAllModelNameList(excel.data).join(',');
    const sheetLengthArr = sheetLengthList(excel.data);
    const imgList = await getCrawlingImg(modelNameToStr, sheetLengthArr);
    const data = setSheetListImage(excel.data, imgList);

    setExcel({ ...excel, data });
  };

  const handleDeleteRow = columnId => {
    const deleteRowList = deleteRow(excel, columnId);
    const sheetLengthArray = sheetLengthList(deleteRowList);
    const sheetNameList = parseSheetNameList(excel.sheetName, sheetLengthArray);

    const data = deleteRowList.filter(sheet => sheet.length);
    let sheetList = excel.sheetList;
    let sheetName = excel.sheetName;
    let sheetItem = excel.sheetItem;
    if (sheetNameList.length !== excel.sheetName.length) {
      sheetList = setSheetList(sheetNameList);
      sheetName = sheetNameList;
      sheetItem = 0;
    }

    setExcel(state => ({
      ...state,
      data,
      sheetList,
      sheetName,
      sheetItem,
    }));
  };

  const handleChangeSheet = e => {
    const { value } = e.target;
    const sheetList = editSheetList(excel, value);
    setExcel({ ...excel, sheetList, sheetItem: Number(value) });
  };

  const handleReadExcel = e => {
    const { files } = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const workBook = XLSX.read(reader.result, {
        type: 'binary',
        cellDates: true,
      });
      const sheetName = workBook.SheetNames;
      const excels = setSheetListImage(setExcels(workBook));
      const sheetList = setSheetList(workBook.SheetNames);
      const jsonToExcelArray = jsonToExcel(workBook);

      if (!Valid.excelSheetCheck(sheetName, jsonToExcelArray)) return;

      setExcel({ data: excels, sheetList, sheetName, sheetItem: 0 });
    };

    reader.readAsBinaryString(files[0]);
    e.target.value = '';
  };

  const handleDownLoadToExcel = async () => {
    const response = await fetch('data/bipumin.xlsx');
    const blob = await response.blob();

    const nowDate = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `bipumin-${nowDate}.xlsx`;
    link.click();
  };

  const handleAddImage = (e, sheetItem, index) => {
    const image = e.target.files[0];
    setMultiImageList(state => [...state, { image, sheetItem, index }]);
    setPreviewImage(image, sheetItem, index);
  };

  const setPreviewImage = (image, sheetItem, index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result;
      const data = setSheetImage(excel.data, preview, sheetItem, index);

      setExcel({ ...excel, data });
    };
    reader.readAsDataURL(image);
  };

  const handleDeleteImage = (sheetItem, index, img) => {
    const sliceImgName = img.slice(0, 4);
    const data = deleteImage(excel, sheetItem, index);

    if (sliceImgName === 'data') {
      const data = deleteMultipartImage(multiImageList, sheetItem, index);
      setMultiImageList(data);
    }

    setExcel({ ...excel, data });
  };

  const handleImageDetail = image => {
    setShowImageModal(state =>
      state.show ? { show: false, image: null } : { show: true, image }
    );
  };

  const sendFormData = data => {
    const formData = new FormData();
    data.forEach(item => {
      formData.append('jsonObjectList', JSON.stringify(item));
    });

    multiImageList.forEach(item => {
      formData.append('multipartFileList', item['image']);
    });

    postMultiData(formData);
  };

  const parseFlatFormData = flatSheet => {
    return flatSheet.map(object => {
      return {
        category: object[ARRAY.MULTIPLE_HEADER[0]],
        modelName: object[ARRAY.MULTIPLE_HEADER[1]],
        serialNum: object[ARRAY.MULTIPLE_HEADER[2]],
        createdAt: object[ARRAY.MULTIPLE_HEADER[3]] || '',
        deptName: object[ARRAY.MULTIPLE_HEADER[4]] || '',
        empName: object[ARRAY.MULTIPLE_HEADER[5]] || '',
        partners: object[ARRAY.MULTIPLE_HEADER[6]] || '',
        image: object['이미지'] || '',
      };
    });
  };

  const formatDate = date => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const postMultiData = data => {
    axios.post('api/supply/excel', data).then(() => {
      initMultiData();
      alertModal(true, '비품 등록이 완료되었습니다.', 2);
    });
  };

  const getCrawlingImg = async (modelNameToString, sheetLengthArr) => {
    let response = null;
    setIsLoading(true);
    await axios
      .get(`api/supply/search?modelNameList=${modelNameToString}`)
      .then(res => {
        response = sliceData(res.data.data, sheetLengthArr);
        setIsLoading(false);
      });

    return response;
  };

  const sliceData = (data, sheetLengthArr) => {
    let result = [];
    sheetLengthArr.forEach(v => {
      result.push(data.splice(0, v));
    });

    return result;
  };

  const setSheetList = workBook => {
    return workBook.map((sheetName, index) =>
      index
        ? {
            status: false,
            sheetName,
          }
        : {
            status: true,
            sheetName,
          }
    );
  };

  const setSheetListImage = (workBook, crawlingImgList) => {
    return workBook.map((sheet, sheetIndex) => {
      return sheet.map((column, columnIndex) => {
        return {
          ...column,
          이미지:
            !column['이미지'] && crawlingImgList
              ? crawlingImgList[sheetIndex][columnIndex].image
              : column['이미지'] || '',
          시리얼넘버: `${column['시리얼넘버']}` || '',
          등록일자: column['등록일자']
            ? formatDate(new Date(column['등록일자']))
            : '',
        };
      });
    });
  };

  const setSheetImage = (workBook, preview, sheetItem, index) => {
    return workBook.map((sheet, sheetIndex) => {
      return sheet.map((column, columnIndex) => {
        return sheetIndex === sheetItem && columnIndex === index
          ? {
              ...column,
              이미지: preview,
            }
          : column;
      });
    });
  };

  const deleteImage = (excel, sheetItem, index) => {
    return excel.data.map((sheet, sheetIndex) => {
      return sheet.map((column, columnIndex) => {
        if (sheetIndex === sheetItem && columnIndex === index) {
          return {
            ...column,
            이미지: '',
          };
        }
        return column;
      });
    });
  };

  const deleteFormDataImage = excel => {
    return excel.data.map(sheet => {
      return sheet.map(column => {
        const sliceImgName = column['이미지'].slice(0, 4);
        if (sliceImgName === 'data') {
          return {
            ...column,
            이미지: '',
          };
        }
        return column;
      });
    });
  };

  const deleteMultipartImage = (multiImageList, sheetItem, index) => {
    return multiImageList.filter(
      item => item.sheetItem !== sheetItem && item.index !== index
    );
  };

  const getAllModelNameList = workBook => {
    const flatSheetList = flatSheet(workBook);
    return flatSheetList.map(object => object[ARRAY.MULTIPLE_HEADER[1]]);
  };

  const editSheetList = (excel, value) => {
    return excel.sheetList.map((sheetItem, index) =>
      index === Number(value)
        ? {
            status: true,
            sheetName: sheetItem.sheetName,
          }
        : {
            status: false,
            sheetName: sheetItem.sheetName,
          }
    );
  };

  const setExcels = workBook => {
    return workBook.SheetNames.map(sheetName =>
      XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
        range: 10,
        blankrows: false,
      })
    );
  };

  const jsonToExcel = workBook => {
    return Object.values(workBook.Sheets).map(sheet =>
      XLSX.utils.sheet_to_json(sheet, {
        range: 10,
        header: 1,
        defval: '',
      })
    );
  };

  const deleteRow = (excel, columnId) => {
    return excel.data.map((sheet, index) =>
      index === excel.sheetItem
        ? sheet.filter((_, index) => index !== Number(columnId))
        : sheet
    );
  };

  const sheetLengthList = sheetList => {
    return sheetList.map(sheet => sheet.length);
  };

  const parseSheetNameList = (excel, sheetLengthList) => {
    return excel.filter((_, index) => sheetLengthList[index] !== 0);
  };

  const flatSheet = excel => {
    return excel.flatMap(sheet => sheet);
  };

  return (
    <MultipleWrapper>
      <MultipleHeader
        inputRef={inputRef}
        downLoadToExcel={handleDownLoadToExcel}
        onReadExcel={handleReadExcel}
        onAddMultiData={handleAddMultiData}
        onAddMultiImage={handleAddMultiImage}
      />
      <MultipleList
        inputRef={inputRef}
        excel={excel}
        onReadExcel={handleReadExcel}
        sheetList={excel.sheetList}
        showImageModal={showImageModal}
        multiImageList={multiImageList}
        onChangeSheet={handleChangeSheet}
        onDeleteRow={handleDeleteRow}
        onAddImage={handleAddImage}
        onDeleteImage={handleDeleteImage}
        onImageDetail={handleImageDetail}
      />
      <ScreenViewLoading isLoading={isLoading} />
    </MultipleWrapper>
  );
}

const MultipleWrapper = styled.section`
  width: 100%;
`;
