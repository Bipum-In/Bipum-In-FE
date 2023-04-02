import styled from 'styled-components';
import { FormatKoreanTime } from 'utils/formatDate';

export default function CreatedAtFormatDate({
  requestStatus,
  createdAt,
  modifiedAt,
}) {
  return (
    <>
      {requestStatus === '처리전' ? (
        <FormatDate>요청일: {FormatKoreanTime(createdAt)}</FormatDate>
      ) : (
        <>
          <FormatDate>요청일: {FormatKoreanTime(createdAt)}</FormatDate>
          <FormatDate>처리일: {FormatKoreanTime(modifiedAt)}</FormatDate>
        </>
      )}
    </>
  );
}

const FormatDate = styled.span`
  width: 100%;
  color: ${props => props.theme.color.grey.brandColor4};
  padding: 0 3.9375rem;
  margin-bottom: 0.3125rem;
  font-weight: 500;
  font-size: 11px;
`;
