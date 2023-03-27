import React from 'react';

export default function useSetEquipmentAdd() {
  const setSelectYear = () => {
    const date = new Date();
    const year = date.getFullYear();

    return Array.from({ length: 30 }).map((_, i) => `${year - i}년`);
  };

  const setSelectMonth = () => {
    return Array.from({ length: 12 }).map((_, i) => `${i + 1}월`);
  };

  const setSelectDaysInMonth = (year, month) => {
    const date = new Date(year, month, 0);
    const days = date.getDate();
    return Array.from({ length: days }).map((_, i) => `${i + 1}일`);
  };
  return [setSelectYear, setSelectMonth, setSelectDaysInMonth];
}
