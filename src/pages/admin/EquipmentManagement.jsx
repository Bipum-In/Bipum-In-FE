import React from 'react';

import { useDispatch } from 'react-redux';
import {} from '../../redux/modules/requestStatus';
import EquipmentListContainer from '../../components/EquipmentManage/EquipmentListContainer';

export default function EquipmentManagement() {
  const dispatch = useDispatch();

  return <EquipmentListContainer />;
}
