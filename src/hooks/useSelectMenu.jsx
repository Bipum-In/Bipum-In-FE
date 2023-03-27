import { useState } from 'react';

export default function useSelectMenu(list) {
  const [menuStyle, setMenuStyle] = useState(list);

  const handleClickMenu = e => {
    const menuName = e.target.innerText;
    const select = selectMenu(menuName);

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

  const setSelectType = () => {
    return menuStyle.filter(value => value.status)[0].type;
  };

  return [menuStyle, handleClickMenu, setSelectName, setSelectType];
}
