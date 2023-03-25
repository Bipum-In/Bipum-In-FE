import styled from 'styled-components';
import Button from '../../../elements/Button';

export default function DetailHeader({ edit, onEdit }) {
  return (
    <DetailHeaderContainer>
      {edit ? (
        <SaveButton>저장</SaveButton>
      ) : (
        <>
          <DisposeButton>폐기</DisposeButton>
          <EditButton onClick={onEdit}>수정</EditButton>
        </>
      )}
    </DetailHeaderContainer>
  );
}

const DetailHeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 2.25rem 0;
  gap: 0.5rem;
`;

const DisposeButton = styled(Button)`
  width: 3.9375rem;
  height: 2.0625rem;
  margin: 0;
  color: #6d5517;
  background-color: #efecd9;
`;

const SaveButton = styled(DisposeButton)`
  color: white;
  background-color: ${props => props.theme.color.blue.brandColor6};
`;

const EditButton = styled(SaveButton)``;
