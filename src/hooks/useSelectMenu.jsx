import { useState } from 'react';

export default function useSelectMenu(list) {
  const [menuStyle, setMenuStyle] = useState(list);

  const handleClickMenu = e => {
    const menuName = e.target.innerText;
    setMenuStyle(selectMenu(menuName));
  };

  const selectMenu = menuName => {
    return menuStyle.map(list =>
      list.name === menuName
        ? { ...list, status: true }
        : { ...list, status: false }
    );
  };

  return [menuStyle, handleClickMenu];
}
