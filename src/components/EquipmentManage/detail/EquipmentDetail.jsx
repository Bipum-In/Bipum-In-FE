import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getEquipmentDetail } from '../../../redux/modules/equipmentStatus';

export default function EquipmentDetail({ detailId }) {
  const dispatch = useDispatch();
  const { getDetail, isDetailError } = useSelector(
    state => state.equipmentStatus.equipmentDetail
  );

  useEffect(() => {
    dispatch(getEquipmentDetail(detailId));
  }, [detailId, dispatch]);

  return <DetailWrapper></DetailWrapper>;
}

const DetailWrapper = styled.main`
  ${props => props.theme.wh100}
  padding: 0 6.375rem;
`;
