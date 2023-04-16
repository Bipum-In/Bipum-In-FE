import { encrypt, decrypt } from './encryption';
import Storage from 'utils/localStorage';
import QUERY from 'constants/query';

const DEFAULT_STORAGE_DATA = {
  checkUser: null,
  deptName: null,
  empName: null,
  image: null,
  isAdmin: null,
  userId: null,
  userRole: null,
};

export function getEncryptionStorage() {
  const encryptedData = Storage.getLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME);

  if (!encryptedData) {
    return DEFAULT_STORAGE_DATA;
  }

  try {
    const decryptedData = decrypt(encryptedData);
    return { ...DEFAULT_STORAGE_DATA, ...decryptedData };
  } catch (error) {
    console.error(
      '로컬 저장소 데이터 복호화 중 오류가 발생했습니다. : ',
      error
    );
    return null;
  }
}

export function updateEncryptionStorage(data) {
  const encryptedData = Storage.getLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME);

  if (!encryptedData) {
    return DEFAULT_STORAGE_DATA;
  }

  let updatedData = {};

  if (typeof data === 'string') {
    // data가 string 타입일 경우, 한 개의 key-value 쌍을 추가함
    updatedData = { ...decrypt(encryptedData), [data]: '' };
  } else if (typeof data === 'object') {
    // data가 object 타입일 경우, 여러 개의 key-value 쌍을 추가함
    updatedData = { ...decrypt(encryptedData), ...data };
  }

  try {
    const updatedEncryptedData = encrypt(updatedData);
    Storage.setLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME, updatedEncryptedData);
    return updatedData;
  } catch (error) {
    console.error(
      '로컬 저장소 데이터 업데이트 중 오류가 발생했습니다. : ',
      error
    );
    return null;
  }
}
