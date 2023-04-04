const ALERT = {
  CHECK_EMPTY: '공백은 입력할 수 없습니다.',
  CHECK_DIFF_PW: '비밀 번호를 다시 확인해 주세요.',
  CHECK_IMAGE_LENGTH(length) {
    return `이미지는 ${length}장까지 등록 가능합니다.`;
  },
};

export default ALERT;
