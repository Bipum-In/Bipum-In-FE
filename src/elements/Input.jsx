import React from 'react';
import styled from 'styled-components';

export default function Input({ inputRef, value, onChange, ...props }) {
  return (
    <InputStyle {...props} ref={inputRef} value={value} onChange={onChange} />
  );
}

Input.defaultProps = {
  padding: '.5rem',
  margin: '.2rem',
  borderR: '.5rem',
  border: 'none',
  bg: 'transparent',
  ts: '.2s ease',
  w: '100%',
  onchange: () => {},
};

const InputStyle = styled.input`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};

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
`;
