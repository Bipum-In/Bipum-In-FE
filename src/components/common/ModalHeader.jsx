import styled, { css } from 'styled-components';
import Button from 'elements/Button';
import { ReactComponent as XClose } from 'styles/commonIcon/close.svg';

export default function ModalHeader({ isClose, requestType, status }) {
  return (
    <TitleContainer>
      <Title>
        <Type>{requestType}서</Type>
        {status && <AcceptStatus status={status}>{status}</AcceptStatus>}
      </Title>
      <Close>
        <Button onClick={isClose}>
          <XClose />
        </Button>
      </Close>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.875rem;
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor7};
  padding: 0 3.9375rem;
  border-radius: 1rem 1rem 0 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Type = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
`;

const Close = styled.div`
  button {
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;

const AcceptStatus = styled.div`
  margin-left: 1rem;
  background-color: white;
  border-radius: 0.25rem;
  padding: 0.375rem 0.625rem;

  ${props =>
    props.status === '승인' &&
    css`
      color: ${props => props.theme.color.accpet};
      border: 1px solid ${props => props.theme.color.accpet};
    `}

  ${props =>
    props.status === '거절' &&
    css`
      color: ${props => props.theme.color.reject};
      border: 1px solid ${props => props.theme.color.reject};
    `}

    ${props =>
    props.status === '폐기' &&
    css`
      color: ${props => props.theme.color.remove};
      border: 1px solid ${props => props.theme.color.remove};
    `}
`;
