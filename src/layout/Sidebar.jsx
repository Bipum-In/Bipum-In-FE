import React from 'react';
import styled from 'styled-components';
import logo from '../styles/logo.png';
import { ReactComponent as Add } from '../styles/sidebarIcons/add.svg';

export default function Sidebar() {
  return (
    <>
      <SidebarWrapper>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <SidebarCategoryContainer>
          <CategoryItemsContainer>
            <Add />
            <ImtesTitle>대시보드</ImtesTitle>
          </CategoryItemsContainer>
        </SidebarCategoryContainer>
      </SidebarWrapper>
    </>
  );
}

const SidebarWrapper = styled.aside`
  width: 15.625rem;
  height: 100%;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: -0.3125rem 0 1.5625rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 0 2.5rem 2.5rem 0;
`;

const LogoContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  ${(props) => props.theme.FlexCenter}
  padding-top: 2.625rem;
`;

const Logo = styled.div`
  width: 5.375rem;
  height: 2.3125rem;
  background: url(${logo}) no-repeat center center / cover;
`;

const SidebarCategoryContainer = styled.div`
  ${(props) => props.theme.FlexCol};
  ${(props) => props.theme.FlexCenter};
  margin-top: 5.9375rem;
`;

const CategoryItemsContainer = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3.125rem;
  width: 6.1875rem;
  height: 1.5rem;
`;

const ImtesTitle = styled.div`
  padding-left: 0.5rem;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSize.regular};
  line-height: 1.3125rem;
  color: #b7b7b7;
`;
