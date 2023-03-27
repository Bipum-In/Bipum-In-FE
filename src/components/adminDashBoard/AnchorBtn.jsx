import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

export default function AnchorBtn({ onClick, children }) {
  return (
    <>
      <CategoryBtnContainer>
        <Button showAll onClick={onClick}>
          {children}
        </Button>
      </CategoryBtnContainer>
    </>
  );
}

const CategoryBtnContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  width: 100%;
  svg {
    transform: rotate(-90deg);
    path {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
  button * {
    align-items: center;
  }
`;
