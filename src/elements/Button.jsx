import React from 'react';
import styled, { css } from 'styled-components';

export default function Button(props) {
  return (
    <ButtonWrapper {...props}>
      <BtnContainer>{props.children}</BtnContainer>
    </ButtonWrapper>
  );
}
Button.defaultProps = {
  padding: '.5rem',
  margin: '.2rem',
  borderR: '.5rem',
  border: 'none',
  bg: 'transparent',
  ts: '.2s ease',
  onClick: () => {},
};

const ButtonWrapper = styled.button`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter}
  width: ${props => props.w};
  height: ${props => props.h};
  font-size: ${props => props.size};

  //기본 값
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  border-radius: ${props => props.borderR};
  border: ${props => props.border};
  background-color: ${props => props.bg};
  transition: ${props => props.ts};
  color: ${props => props.color};
  pointer-events: ${props => (props.disabled ? 'none' : 'pointer')};
  white-space: nowrap;

  ${props =>
    props.reg &&
    css`
      padding: 0.3rem 0.5rem;
      font-size: 0.75rem;
      color: white;
      background: blue;
      height: 100%;
    `}

  ${props =>
    props.menuStyle
      ? css`
          width: 15rem;
          height: 3.125rem;
          color: white;
          background-color: ${props => props.theme.color.blue.brandColor6}
          margin: 0 0.6875rem;
          border: 0.0579rem solid ${props =>
            props.theme.color.grey.brandColor2};
          box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
          border-radius: 0.4631rem;
          font-weight: 600;
          font-size: 1.25rem;
        `
      : css`
          width: 15rem;
          height: 3.125rem;
          color: ${props => props.theme.color.grey.brandColor7};
          background-color: white;
          margin: 0 0.6875rem;
          border: 0.0579rem solid ${props => props.theme.color.grey.brandColor2};
          box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
          border-radius: 0.4631rem;
          font-weight: 400;
          font-size: 1.25rem;
        `}


  & {
    cursor: pointer;
  }

  &:active,
  &:hover {
    opacity: 0.9;
  }
`;

const BtnContainer = styled.div`
  ${props => props.theme.FlexRow};
`;
