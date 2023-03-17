import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashBoardLayout() {
  return (
    <LayoutWrapper>
      <Header />
      <Sidebar />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const OutletContainer = styled.div`
  width: calc(100% - 15.625rem);
  height: 100%;
  margin-left: auto;
  padding: 9.6875rem 3.25rem 3.75rem 3.25rem;
  background-color: ${props => props.theme.color.blue.brandColor1};
`;
