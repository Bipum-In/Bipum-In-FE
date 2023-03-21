import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../elements/Button';

export default function CategoryItems({ getCategory, onClickMenu }) {
  return (
    <>
      <CategoryItemsWrapper>
        {getCategory &&
          getCategory.map(item => (
            <CategoryItemContainer key={uuidv4()}>
              <Button category={item.status} onClick={e => onClickMenu(e)}>
                {item.name}
              </Button>
            </CategoryItemContainer>
          ))}
      </CategoryItemsWrapper>
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
  &:before {
    content: '';
    position: absolute;
    right: 1rem;
    height: 100%;
    width: 1px;
    background-color: ${props => props.theme.color.grey.brandColor2};
  }
  &:last-child:before {
    display: none;
  }
`;
