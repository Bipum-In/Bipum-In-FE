import React from 'react';
import styled from 'styled-components';
import Button from 'elements/Button';
import { ReactComponent as DeleteIcon } from 'styles/commonIcon/cancelInput.svg';

export default function AnchorBtn({
  onClick,
  children,
  isAlert,
  allDeleteAlarm,
  setDeleteToggle,
  isDeleteShow,
}) {
  return (
    <>
      <CategoryBtnContainer>
        <Button showAll onClick={onClick}>
          {children}
        </Button>
        {isAlert && (
          <>
            <AllDeleteSvg
              onClick={() => setDeleteToggle(prev => !prev)}
              show={isDeleteShow}
            />
            <AllDeleteMsgBtn onClick={allDeleteAlarm} show={isDeleteShow}>
              모든 알림 삭제
            </AllDeleteMsgBtn>
          </>
        )}
      </CategoryBtnContainer>
    </>
  );
}

const CategoryBtnContainer = styled.div`
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  svg {
    transform: rotate(-90deg);
    cursor: pointer;
    path {
      stroke: ${props => props.theme.color.blue.brandColor6};
    }
  }
  button * {
    align-items: center;
  }
`;

const AllDeleteSvg = styled(DeleteIcon)`
  position: absolute;
  right: 1rem;
  opacity: ${props => (props.show ? '0' : '1')};
  pointer-events: ${props => (props.show ? 'none' : 'auto')};
  transform: rotate(-90deg);
  transition: opacity 0.1s ease-in-out;
`;

const AllDeleteMsgBtn = styled(Button)`
  background: ${props => props.theme.color.blue.brandColor2};
  color: ${props => props.theme.color.blue.brandColor6};
  font-weight: ${props => props.theme.fontWeight.weight7};
  opacity: ${props => (props.show ? '1' : '0')};
  pointer-events: ${props => (props.show ? 'auto' : 'none')};
  transition: opacity 0.1s ease-in-out;
`;
