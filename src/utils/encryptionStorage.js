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

export function updateEncryptionStorage(key, value) {
  const encryptedData = Storage.getLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME);

  if (!encryptedData) {
    return DEFAULT_STORAGE_DATA;
  }

  try {
    const decryptedData = decrypt(encryptedData);
    decryptedData[key] = value;
    const updatedEncryptedData = encrypt(decryptedData);
    Storage.setLocalStorageJSON(QUERY.STORAGE.LOCAL_NAME, updatedEncryptedData);
  } catch (error) {
    console.error(
      '로컬 저장소 데이터 업데이트 중 오류가 발생했습니다. : ',
      error
    );
    return null;
  }
}
