import React from 'react';
import styled from 'styled-components';

import DeptManagement from 'components/management/DeptManagement';

export default function AppointmentManager() {
  return (
    <>
      <ManagementComponentsContainer>
        <DeptManagement />
      </ManagementComponentsContainer>
    </>
  );
}

const ManagementComponentsContainer = styled.main`
  ${props => props.theme.FlexRow};
  ${props => props.theme.wh100};
  background-color: white;
  box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4628rem;
`;
