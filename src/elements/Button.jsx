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
  ts: '.1s ease',
  onClick: () => {},
};

const ButtonWrapper = styled.button`
  ${(props) => props.theme.FlexRow};
  ${(props) => props.theme.FlexCenter}
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  font-size: ${(props) => props.size};

  //기본 값
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderR};
  border: ${(props) => props.border};
  background-color: ${(props) => props.bg};
  transition: ${(props) => props.ts};
  color: ${(props) => props.color};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'pointer')};
  white-space: nowrap;

  ${(props) =>
    props.reg &&
    css`
      padding: 0.3rem 0.5rem;
      font-size: 0.75rem;
      color: white;
      background: blue;
      height: 100%;
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
  ${(props) => props.theme.FlexRow};
`;
