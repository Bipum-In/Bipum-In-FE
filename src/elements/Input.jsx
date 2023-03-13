import React from 'react';
import styled, { css } from 'styled-components';

export const Input = React.forwardRef((props, ref) => (
  <InputLayout>
    <InputStyle {...props} ref={ref} />
  </InputLayout>
));

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
  ${(props) => props.theme.FlexRow};
  ${(props) => props.theme.FlexCenter};

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

  ${(props) =>
    props.reg &&
    css`
      flex: 1 1 auto;
      width: 100%;
    `}
`;

export default Input;

export function InputLayout(prop) {
  return (
    <InputWrapper>
      <InputContainer {...prop}>{prop.children}</InputContainer>
    </InputWrapper>
  );
}

InputLayout.defaultProps = {
  border: 'gray',
  borderR: '.5rem',
};

const InputWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  width: 100%;
`;
const InputContainer = styled.div`
  position: relative;
  ${(props) => props.theme.FlexRow}
  ${(props) => props.theme.FlexCenter}
  flex: 0 0 30px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: ${(props) => props.borderR};
  border: 1px solid ${(props) => props.border};
  transition: 0.1s;
`;
