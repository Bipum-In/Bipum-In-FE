import styled from 'styled-components';

export default function UserContent({
  content,
  serialNum,
  modelName,
  requestType,
  categoryName,
  requestStatus,
}) {
  return (
    <UserContentWrapper>
      <CategoryNameAndList>
        <UserContentContainer>
          <ContentName>종류</ContentName>
          <ContentType>{categoryName}</ContentType>
        </UserContentContainer>
        <UserContentContainer>
          <ContentName>사용처</ContentName>
          <ContentType>개인</ContentType>
        </UserContentContainer>
        <UserContentContainer>
          <ContentName>제품명</ContentName>
          <ContentType>{modelName}</ContentType>
        </UserContentContainer>
        {requestType !== '비품 요청' && requestStatus === '처리전' && (
          <UserContentContainer>
            <ContentName>시리얼넘버</ContentName>
            <ContentType>{serialNum}</ContentType>
          </UserContentContainer>
        )}
      </CategoryNameAndList>
      <UserContentContainer>
        <ContentName>메세지</ContentName>
        <ContentType>{content}</ContentType>
      </UserContentContainer>
    </UserContentWrapper>
  );
}

const UserContentWrapper = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};
`;

const UserContentContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 0.375rem;
  margin-right: 1.5rem;
`;

const CategoryNameAndList = styled.div`
  display: flex;
  margin-bottom: 1.375rem;
`;

const ContentName = styled.span`
  color: ${props => props.theme.color.grey.brandColor5};
  min-width: 3rem;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const ContentType = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  word-wrap: break-word;
`;
