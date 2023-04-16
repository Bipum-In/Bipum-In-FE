import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function ManageSidebar({
  largetCategoryList,
  activeCategory,
  onClickMenu,
}) {
  return (
    <CategorySidebar>
      {largetCategoryList &&
        largetCategoryList.map(item => (
          <LargeTypeContainer key={uuidv4()}>
            <LageType
              active={item.name === activeCategory}
              category={item.status}
              onClick={e => {
                onClickMenu(e);
              }}
            >
              {item.name}
            </LageType>
          </LargeTypeContainer>
        ))}
    </CategorySidebar>
  );
}

const CategorySidebar = styled.div`
  ${props => props.theme.FlexCol};
  width: 14.75rem;
  height: 100%;
  border-right: 0.0625rem solid ${props => props.theme.color.grey.brandColor3};
`;

const LargeTypeContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  position: relative;
  font-size: 0.875rem;
  :hover {
    background-color: ${props => props.theme.color.blue.brandColor2};
  }
`;

const LageType = styled.div`
  align-items: center;
  padding-left: 2.4375rem;
  display: flex;

  width: 100%;
  height: 4.5rem;
  border-bottom: 0.0625rem solid ${props => props.theme.color.grey.brandColor4};
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: white;
      background-color: ${props.theme.color.blue.brandColor5};
    `}
`;
