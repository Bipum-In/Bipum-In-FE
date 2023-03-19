// import React, { useState } from 'react';
// import styled, { css } from 'styled-components';
// import { ReactComponent as ArrowDown } from '../../styles/commonIcon/arrowDown.svg';

// export default function SelectBoxs({ type, seleteValue, show, option, text }) {
//   const [display, setDisplay] = useState(false);
//   const handleShowSelect = () => setDisplay(prev => !prev);
//   return (
//     <>
//       <SelectBoxContainer type={type}>
//         <SelectBox onClick={handleShowSelect}>
//           <ArrowDown />
//           <CurrentState>
//             {seleteValue}
//             {text}
//           </CurrentState>
//           <SelectOptions show={show}>{option}</SelectOptions>
//         </SelectBox>
//       </SelectBoxContainer>
//     </>
//   );
// }

// const SelectBoxContainer = styled.div`
//   width: 5rem;
//   height: 2.5rem;
// `;

// const SelectBox = styled.div`
//   position: relative;
//   border-radius: 0.375rem;
//   border: 0.0625rem solid;
//   font-weight: 600;
//   font-size: 1.125rem;
//   line-height: 1.3125rem;
//   padding: 8px;
//   svg {
//     position: absolute;
//     right: 5px;
//     top: 50%;
//     transform: translateY(-50%);
//   }
//   ${props => props.theme.FlexCenter};
//   ${props =>
//     props.type === 'true'
//       ? css`
//           width: 14.125rem;
//           color: ${props => props.theme.color.blue.brandColor6};
//           background-color: ${props.theme.color.blue.brandColor1};
//           border-color: ${props => props.theme.color.blue.brandColor6};
//           &::before {
//             color: ${props => props.theme.color.blue.brandColor6};
//           }
//         `
//       : css`
//           width: 100%;
//           color: ${props => props.theme.color.grey.brandColor7};
//           background-color: ${props.theme.color.grey.brandColor1};
//           border-color: ${props => props.theme.color.grey.brandColor3};
//         `}

//   height: 2.5rem;
//   cursor: pointer;
// `;

// const CurrentState = styled.label`
//   margin-left: 0.25rem;
//   text-align: center;
// `;

// const SelectOptions = styled.ul`
//   position: absolute;
//   top: 2.1875rem;
//   left: 0;
//   width: 100%;
//   max-height: 6.25rem;
//   overflow-y: auto;
//   height: 8.625rem;
//   max-height: ${({ show }) => (show ? 'none' : '0')};
//   padding: 0;
//   border-radius: 0.5rem;
//   background-color: #f6faff;
//   z-index: 30;
// `;
