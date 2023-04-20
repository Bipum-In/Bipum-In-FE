import { lazy } from 'react';
import Storage from './localStorage';

export const retryLazy = componentImport =>
  lazy(async () => {
    const pageAlreadyRefreshed =
      Storage.getLocalStorage('pageRefreshed') || 'false';
    const boolValue = pageAlreadyRefreshed === 'true';
    console.log('에러 발생', boolValue);
    try {
      const component = await componentImport();
      window.localStorage.setItem('pageRefreshed', 'false');
      console.log('에러 감지', boolValue);
      return component;
    } catch (error) {
      if (!boolValue) {
        console.log('에러 감지 리로드', boolValue);
        window.localStorage.setItem('pageRefreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });
