import ALERT from '../constants/alert';

const Valid = {
  signUp(id, pw, pwCheck, nickName, isIdDone, isNickNameDone) {
    if (!formEmpty(id, pw, pwCheck, nickName)) {
      alert(ALERT.CHECK_EMPTY);
      return false;
    }
    if (!pwDifferentCheck(pw, pwCheck)) {
      alert(ALERT.CHECK_DIFF_PW);
      return false;
    }
    if (!idLength(id)) {
      alert('아이디는 4글자 이상 10이하만 입력 가능 합니다.');
      return false;
    }
    if (!idType(id)) {
      alert('아이디는 숫자, 문자만 입력 가능 합니다.');
      return false;
    }
    if (!nickNameLength(nickName)) {
      alert('닉네임은 2글자 이상 10글자 이하만 입력 가능 합니다.');
      return false;
    }
    if (!pwLength(pw)) {
      alert('비밀번호는 8글자 이상 15글자 이하만 입력 가능 합니다.');
      return false;
    }
    if (!pwType(pw)) {
      alert('비밀번호는 숫자, 문자, 대문자 특수문자만 입력 가능 합니다.');
      return false;
    }
    if (!idDoneCheck(isIdDone)) {
      alert('아이디 중복 체크 확인 바랍니다.');
      return false;
    }
    if (!nickNameDoneCheck(isNickNameDone)) {
      alert('닉네임 중복 체크 확인 바랍니다.');
      return false;
    }

    return true;
  },

  login(id, pw) {
    if (!formEmpty(id, pw)) {
      alert(ALERT.CHECK_EMPTY);
      return false;
    }
    if (!idLength(id)) {
      alert('아이디는 4글자 이상 10이하만 입력 가능 합니다.');
      return false;
    }
    if (!idType(id)) {
      alert('아이디는 숫자, 문자만 입력 가능 합니다.');
      return false;
    }
    if (!pwLength(pw)) {
      alert('비밀번호는 8글자 이상 15글자 이하만 입력 가능 합니다.');
      return false;
    }
    if (!pwType(pw)) {
      alert('비밀번호는 숫자, 문자, 대문자 특수문자만 입력 가능 합니다.');
      return false;
    }

    return true;
  },

  emptyPostAddCheck(img, ...input) {
    if (!formEmpty(...input)) {
      alert('공백은 추가할수 없습니다.');
      return false;
    }
    if (!imgEmpty(img)) {
      alert('이미지를 추가해 주세요.');
      return false;
    }

    return true;
  },

  addLenghCheck(title, content) {
    if (!titleLength(title)) {
      alert('제목은 20자 이상 입력할 수 없습니다.');
      return false;
    }
    if (!contentLength(content)) {
      alert('내용은 200자 이상 입력할 수 없습니다.');
      return false;
    }

    return true;
  },
};

function imgEmpty(img) {
  if (img.length <= 0) return false;
  return true;
}

function titleLength(text) {
  if (text.length > 20) return false;
  return true;
}

function contentLength(text) {
  if (text.length > 200) return false;
  return true;
}

function formEmpty(...text) {
  const textArr = text.filter(v => v === '');
  if (textArr.length !== 0) return false;
  return true;
}

function idLength(id) {
  if (id.length < 4 || id.length > 10) return false;
  return true;
}

function idType(id) {
  if (!/[a-zA-Z0-9]/.test(id)) return false;
  return true;
}

function nickNameLength(nickName) {
  if (nickName.length < 2 || nickName.length > 10) return false;
  return true;
}

function pwLength(pw) {
  if (pw.length < 8 || pw.length > 15) return false;
  return true;
}

function pwType(pw) {
  const regExp = /[?.,;:|*~`!^\-_+<>@#$%&]/g;
  if (!/[a-zA-Z0-9]/gi.test(pw) && !regExp.test(pw)) return false;
  return true;
}

function pwDifferentCheck(...text) {
  if (new Set([...text]).size === text.length) return false;
  return true;
}

function idDoneCheck(id) {
  if (!id) return false;
  return true;
}

function nickNameDoneCheck(nickName) {
  if (!nickName) return false;
  return true;
}

export default Valid;
