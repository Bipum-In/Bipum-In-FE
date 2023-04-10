import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'elements/Button';

export default function CategoryItems({
  getCategory,
  getSmallCategory,
  categoryOutsideRef,
  onClickMenu,
  onClickCategory,
}) {
  return (
    <>
      <CategoryItemsWrapper ref={categoryOutsideRef}>
        {getCategory &&
          getCategory.map(item => (
            <CategoryItemContainer key={item.name}>
              <Button
                category={item.status}
                onClick={e => {
                  onClickMenu(e);
                }}
              >
                {item.name}
              </Button>
            </CategoryItemContainer>
          ))}
      </CategoryItemsWrapper>
      {getSmallCategory && (
        <CategoryWrapper show={getSmallCategory.show}>
          <SmallCategoryItemsWrapper>
            {getSmallCategory.list.map(item => (
              <SmallCategoryItemContainer key={item.categoryId}>
                <Button onClick={e => onClickCategory(e)}>
                  {item.categoryName}
                </Button>
              </SmallCategoryItemContainer>
            ))}
          </SmallCategoryItemsWrapper>
        </CategoryWrapper>
      )}
    </>
  );
}

const CategoryItemsWrapper = styled.div`
  ${props => props.theme.FlexRow};
  width: 100%;
  height: 3rem;
  padding: 0.875rem 2.5rem;
  background-color: white;
  ${props => props.theme.Boxshadow};
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
`;

const CategoryItemContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  padding-right: 2rem;
  font-size: 0.875rem;

  button {
    font-weight: 600;
  }
`;

const CategoryWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 3rem;
  ${props =>
    props.show
      ? css`
          transform: translateY(0rem);
          opacity: 1;
        `
      : css`
          transform: translateY(-0.3rem);
          opacity: 0;
          pointer-events: none;
        `}

  z-index: 2;
  transition: all 0.3s ease;
`;

const SmallCategoryItemsWrapper = styled(CategoryItemsWrapper)`
  /* position: absolute; */
  flex-flow: wrap;
  width: 100%;
  height: auto;
  padding: 0 1rem;
  gap: 1rem;
  white-space: pre-wrap;
`;

const SmallCategoryItemContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
`;
