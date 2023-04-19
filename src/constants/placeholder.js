const PLACEHOLDER = {
  ENTER_YOUR_SELF: '직접 입력하세요.',
  PASSWORD_INPUT_LENGTH: length => `${length || ''}자리 비밀번호`,
  CHECK_PASSWORD: number => `${number || ''} 비밀번호 확인`,
  lEAVE_TO_MESSAGE_LENGTH: length => `${length || ''}자 이내로 입력해주세요.`,
  ENTER_INPUT: (keyword, subDivision) =>
    `${keyword || ''} 입력해주세요 ${subDivision || ''}`,
};

export default PLACEHOLDER;
