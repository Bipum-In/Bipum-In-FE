import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockView from 'components/stockView/StockView';
import { getCategoryList, initEquipment } from 'redux/modules/equipmentStatus';

export default function UserStockView() {
  const dispatch = useDispatch();
  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  useEffect(() => {
    dispatch(getCategoryList());
    return () => {
      dispatch(initEquipment());
    };
  }, [dispatch]);

  if (isCategoryError) return <div>에러 발생</div>;
  return <>{getCategory && <StockView category={getCategory} />}</>;
}
