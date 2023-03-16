import { useState } from 'react';
import Storage from '../utils/localStorage';

export default function useSelectMenu(list, StorgeKey) {
  const getStorage = Storage.getLocalStorageJSON(StorgeKey);
  const [menuStyle, setMenuStyle] = useState(getStorage ? getStorage : list);

  const handleClickMenu = e => {
    const menuName = e.target.innerText;
    const select = selectMenu(menuName);

    Storage.setLocalStorageJSON(StorgeKey, select);
    setMenuStyle(select);
  };

  const selectMenu = menuName => {
    return menuStyle.map(list =>
      list.name === menuName
        ? { ...list, status: true }
        : { ...list, status: false }
    );
  };

  const setSelectName = () => {
    return menuStyle.filter(list => list.status)[0].name;
  };

  return [menuStyle, handleClickMenu, setSelectName];
}
