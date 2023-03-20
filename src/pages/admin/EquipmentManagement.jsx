import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {} from '../../redux/modules/requestStatus';
import EquipmentListContainer from '../../components/EquipmentManage/EquipmentListContainer';
import { getCategoryList } from '../../redux/modules/equipmentStatus';

export default function EquipmentManagement() {
  const dispatch = useDispatch();
  const { getCategory, isCategoryError } = useSelector(
    state => state.equipmentStatus.category
  );

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  if (isCategoryError) return <div>에러 발생</div>;
  return (
    <>{getCategory && <EquipmentListContainer category={getCategory} />}</>
  );
}
