import React from 'react';
import styled, { css } from 'styled-components';

export function CategoryItemLeft({ children, title, category, onClick }) {
  return (
    <CategoryItemsContainer active={category} onClick={onClick}>
      {children}
      <ImtesTitle>{title}</ImtesTitle>
    </CategoryItemsContainer>
  );
}

export function CategoryItemRight({ children, title, category, onClick }) {
  return (
    <CategoryItemsContainer active={category} onClick={onClick}>
      <ImtesTitle>{title}</ImtesTitle>
      {children}
    </CategoryItemsContainer>
  );
}

const CategoryItemsContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow}
  ${props => props.theme.FlexCenter};
  width: 100%;
  height: 3.25rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  * {
    transition: 0.2s ease;
    ${props => props.theme.CursorActive};
    stroke: ${props => props.theme.color.grey.brandColor4};
  }
  ${props =>
    props.active === 'true'
      ? css`
          color: ${props.theme.color.blue.brandColor6};
          background-color: ${props.theme.color.blue.brandColor1};
          svg path {
            stroke: ${props.theme.color.blue.brandColor6};
          }
        `
      : css`
          color: ${props.theme.color.grey.brandColor4};

          :hover {
            color: ${props.theme.color.blue.brandColor6};
            background-color: ${props.theme.color.blue.brandColor1};
            svg path {
              stroke: ${props.theme.color.blue.brandColor6};
            }
          }
        `};

  &:before {
    content: '';
    ${props => props.theme.AbsoluteTL};
    ${props => props.theme.wh100};
    ${props => props.theme.CursorActive};
  }
`;

const ImtesTitle = styled.div`
  padding: 0 0.5rem;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;
