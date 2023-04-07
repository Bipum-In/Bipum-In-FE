import React from 'react';
import styled from 'styled-components';
import STRING from 'constants/string';
export default function PartnerManagement() {
  return (
    <Warpper>
      <ManagementType>
        <Title>{STRING.MANAGEMENT_TITLE.PARTNER}</Title>
      </ManagementType>
    </Warpper>
  );
}

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin-left: 2.5rem;
`;

const ManagementType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.75rem;
  width: 100%;
  height: 3rem;
`;

const Warpper = styled.div`
  ${props => props.theme.wh100};
  height: 73.9vh;
  display: flex;
  overflow: hidden;
  position: relative;
`;
