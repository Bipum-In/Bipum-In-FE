import styled from 'styled-components';
import Button from '../../elements/Button';
import { ReactComponent as XClose } from '../../styles/commonIcon/close.svg';

export default function ModalHeader({ isClose, requestType }) {
  return (
    <TitleContainer>
      <Title>
        <Type>{requestType}서</Type>
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

const Title = styled.div``;

const Type = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
`;

const Status = styled.div`
  color: ${props => props.theme.color.grey.brandColor7};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Close = styled.div`
  button {
    font-size: 1.0625rem;
    font-weight: 700;
  }
`;
