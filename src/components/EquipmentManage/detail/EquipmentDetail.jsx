import React from 'react';
import styled from 'styled-components';

export default function EquipmentDetail({ detailId }) {
  return <DetailWrapper></DetailWrapper>;
}

const DetailWrapper = styled.main`
  ${props => props.theme.wh100}
  padding: 0 6.375rem;
`;
