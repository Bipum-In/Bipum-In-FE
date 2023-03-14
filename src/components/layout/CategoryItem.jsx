import React from 'react';
import styled from 'styled-components';

export default function CategoryItem({ children, title, category, onClick }) {
  return (
    <CategoryItemsContainer active={category} onClick={onClick}>
      {children}
      <ImtesTitle>{title}</ImtesTitle>
    </CategoryItemsContainer>
  );
}

const CategoryItemsContainer = styled.div`
  ${props => props.theme.FlexRow}
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3.125rem;
  width: 6.1875rem;
  height: 1.5rem;
  color: ${props =>
    props.active === 'true'
      ? props.theme.color.blue.brandColor6
      : props.theme.color.grey.brandColor4};

  svg {
    width: 1.5rem;
    height: 1.5rem;
    path {
      stroke: ${props =>
        props.active === 'true'
          ? props.theme.color.blue.brandColor6
          : props.theme.color.grey.brandColor4};
    }
  }

  :hover * {
    color: ${props => props.theme.color.blue.brandColor6};
    stroke: ${props => props.theme.color.blue.brandColor6};
  }

  * {
    transition: 0.2s ease;
    cursor: pointer;
  }
`;

const ImtesTitle = styled.div`
  padding-left: 0.5rem;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;
