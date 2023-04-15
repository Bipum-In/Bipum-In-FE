import styled from 'styled-components';
import { FormatKoreanTime } from 'utils/formatDate';

export default function CreatedAtFormatDate({
  requestStatus,
  createdAt,
  modifiedAt,
}) {
  return (
    <FormatDateContainer>
      {requestStatus === '처리전' ? (
        <FormatDate>요청일: {FormatKoreanTime(createdAt)}</FormatDate>
      ) : (
        <>
          <FormatDate>요청일: {FormatKoreanTime(createdAt)}</FormatDate>
          <FormatDate>처리일: {FormatKoreanTime(modifiedAt)}</FormatDate>
        </>
      )}
    </FormatDateContainer>
  );
}

const FormatDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.3125rem;
`;

const FormatDate = styled.span`
  width: 100%;
  color: ${props => props.theme.color.grey.brandColor4};
  margin-bottom: 0.3125rem;
  font-weight: 500;
  font-size: 11px;
`;
