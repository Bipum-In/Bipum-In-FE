import styled, { css } from 'styled-components';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';

export default function SelectBoxs({
  seleteValue,
  show,
  children,
  text,
  onClick,
  eqtype,
  height,
}) {
  return (
    <SelectBox onClick={onClick} eqtype={eqtype}>
      <ArrowDown />

      {seleteValue}
      <CurrentState>{text}</CurrentState>
      <SelectOptions show={show} height={height}>
        {children}
      </SelectOptions>
    </SelectBox>
  );
}

const SelectBox = styled.div`
  position: relative;
  border-radius: 0.375rem;
  border: 0.0625rem solid;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  padding: 0.5rem;
  svg {
    position: absolute;
    right: 0.3125rem;
    top: 50%;
    transform: translateY(-50%);
  }
  ${props => props.theme.FlexCenter};
  ${props =>
    props.eqtype === 'true'
      ? css`
          width: 14.125rem;
          color: ${props => props.theme.color.blue.brandColor6};
          background-color: ${props.theme.color.blue.brandColor1};
          border-color: ${props => props.theme.color.blue.brandColor6};
          &::before {
            color: ${props => props.theme.color.blue.brandColor6};
          }
        `
      : css`
          width: 100%;
          color: ${props => props.theme.color.grey.brandColor7};
          background-color: ${props.theme.color.grey.brandColor1};
          border-color: ${props => props.theme.color.grey.brandColor3};
        `}
  height: 2.5rem;
  cursor: pointer;
`;
const CurrentState = styled.label`
  margin-left: 0.25rem;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  top: 2.1875rem;
  left: 0;
  width: 100%;
  overflow-y: auto;
  ${props =>
    props.height === 'true'
      ? css`
           max-height: ${props => (props.show ? 'none' : '0')};
          height: 6.1819rem;
          }
        `
      : css`
          max-height: ${props => (props.show ? 'none' : '0')};
          height: 8.2425rem;
        `}
  padding: 0;
  border-radius: 0.5rem;
  background-color: #f6faff;
  z-index: 30;
`;
