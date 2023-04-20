import { lazy } from 'react';
import Storage from './localStorage';

export const retryLazy = componentImport =>
  lazy(async () => {
    const pageAlreadyRefreshed =
      Storage.getLocalStorage('pageRefreshed') || 'false';
    const boolValue = pageAlreadyRefreshed === 'true';

    try {
      const component = await componentImport();
      window.localStorage.setItem('pageRefreshed', 'false');
      return component;
    } catch (error) {
      if (!boolValue) {
        window.localStorage.setItem('pageRefreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });
