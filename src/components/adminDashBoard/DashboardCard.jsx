import React from 'react';
import styled from 'styled-components';

export default function DashboardCard({
  categoryName,
  categoryImage,
  totalCount,
  useCount,
  repairCount,
  stockCount,
}) {
  return (
    <>
      <CardWrapper>
        <CategoryContainer>
          <CategoryTitle>{categoryName}</CategoryTitle>
          <TotalCountTitle>
            총수량 <span>{totalCount}개</span>
          </TotalCountTitle>
        </CategoryContainer>
        <StatusWrapper>
          <StatusContainer>
            <StatusTitle>사용중</StatusTitle>
            <StatusCount>{useCount}개</StatusCount>
          </StatusContainer>
          <StatusHr />
          <StatusContainer>
            <StatusTitle>수리중</StatusTitle>
            <StatusCount>{repairCount}개</StatusCount>
          </StatusContainer>
          <StatusHr />
          <StatusContainer>
            <StatusTitle>재고</StatusTitle>
            <StatusCount>{stockCount}개</StatusCount>
          </StatusContainer>
        </StatusWrapper>
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  width: 15rem;
  min-height: 12rem;
  padding: 2.1875rem;
  background-color: white;
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  ${props => props.theme.Boxshadow};
`;

const CategoryContainer = styled.div`
  ${props => props.theme.FlexCol};
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;
const CategoryTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;
const TotalCountTitle = styled.span`
  color: ${props => props.theme.color.blue.brandColor6};
  font-size: 0.875rem;
  gap: 0.375rem;
  span {
    font-size: 1.125rem;
    font-weight: bold;
  }
`;

const StatusWrapper = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  justify-content: space-between;
`;
const StatusContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 0.3125rem;
  width: max-content;
`;

const StatusTitle = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.color.grey.brandColor7};
  width: max-content;
`;

const StatusCount = styled.span`
  font-size: 1rem;
`;

const StatusHr = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  width: 1.5rem;
  &:before {
    content: '';
    width: 0rem;
    height: 2rem;
    border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  }
`;
