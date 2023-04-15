const ALERT = {
  CHECK_EMPTY: '공백은 입력할 수 없습니다.',
  CHECK_DIFF_PW: '비밀 번호를 다시 확인해 주세요.',
  CHECK_IMAGE_LENGTH(length) {
    return `이미지는 ${length}장까지 등록 가능합니다.`;
  },
  CHECK_EXCEL_SHEET(errorArray) {
    return `다음 항목을 확인해 주세요.

            ${errorArray.join(' ')}`;
  },
  CHECK_INPUT_KO_AND_ENG_AND_NUM(name) {
    return `${name}은 한글(자음,모음 제외), 영문, 숫자만 입력 가능합니다.`;
  },
};

export default ALERT;
