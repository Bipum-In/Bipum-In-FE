import React from 'react';
import styled, { css } from 'styled-components';

export default function Button(props) {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
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
    props.submit &&
    css`
      padding: 0rem 0.625rem;
      font-size: ${props => (props.post === 'true' ? '1.375rem' : '1rem')};
      width: ${props => (props.post ? '20.5em;' : '15rem')};
      height: 3.5rem;
      text-align: center;
      color: white;
      background: ${props =>
        props.disabled
          ? props.theme.color.grey.brandColor3
          : props.theme.color.blue.brandColor6};
    `}

  ${props =>
    props.cancel &&
    css`
      padding: 0rem 0.625rem;
      font-size: 1rem;
      width: 15rem;
      height: 3.5rem;
      text-align: center;
      color: ${props => props.theme.color.blue.brandColor6};
      border: 0.0625rem solid ${props => props.theme.color.blue.brandColor6};
      background-color: white;
      margin-right: 1.25rem;
    `}


  ${props =>
    props.showAll &&
    css`
      color: ${props => props.theme.color.blue.brandColor6};
      line-height: 1.4919rem;
      font-size: 1rem;
      font-weight: 600;
      padding: 1rem 0;
    `}

  ${props =>
    props.category &&
    css`
      color: ${props => props.theme.color.blue.brandColor6};
      font-weight: 600;
    `}


  ${props =>
    (props.menuStyle === true || props.menuStyle === false) &&
    css`
      width: 12.5rem;
      height: 2.5rem;
      margin: 0 0.6875rem 1.375rem 0;
      border: 0.0579rem solid ${props => props.theme.color.grey.brandColor2};
      box-shadow: 0.2314rem 0.2314rem 1.1571rem rgba(0, 0, 0, 0.1);
      border-radius: 0.4631rem;
      font-size: 1rem;
    `}

${props =>
    props.menuStyle === true &&
    css`
      color: white;
      background-color: ${props => props.theme.color.blue.brandColor6};
      font-weight: 600;
    `}

${props =>
    props.menuStyle === false &&
    css`
      color: ${props => props.theme.color.grey.brandColor7};
      background-color: white;
      font-weight: 400;
    `}


  & {
    cursor: pointer;
  }

  &:active,
  &:hover {
    opacity: 0.9;
  }
`;
