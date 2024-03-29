import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FormatDateToKoShort } from 'utils/formatDate';

export default function StockViewList({ pageRef, requestData, onClickDetail }) {
  const { content } = requestData;

  return (
    <StockWrapper>
      {content.length === 0 && (
        <EmptyContainer>현재 비품의 재고가 존재하지 않습니다.</EmptyContainer>
      )}
      <CardContainer ref={pageRef} contentLenght={content.length}>
        {content.map(item => (
          <Card
            key={uuidv4()}
            onClick={() => {
              onClickDetail(item.supplyId);
            }}
          >
            <img src={item.image} alt="" />
            <Content>
              <StokeItemTitle>
                <TextOverflow>{item.modelName} </TextOverflow>
              </StokeItemTitle>
              <StokeCreateAt>
                등록일: {FormatDateToKoShort(item.createdAt)}
              </StokeCreateAt>
            </Content>
          </Card>
        ))}
      </CardContainer>
    </StockWrapper>
  );
}

const StockWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: calc(100vh - 16.6875rem - 11rem);
  padding: 0 5.3125rem;
  overflow: hidden auto;
`;

const EmptyContainer = styled.div`
  display: flex;
  ${props => props.theme.FlexCenter}
  width: 100%;
  height: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
  gap: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: calc(25% - 1.2rem);
  width: 100%;
  height: 9.5rem;
  padding: 1.5rem 1.875rem;
  ${props => props.theme.Boxshadow}
  gap: 1rem;
  cursor: pointer;

  img {
    min-width: 7rem;
    width: 7rem;
    min-height: 7rem;
    height: 7rem;
    border-radius: 0.25rem;
  }

  @media (max-width: 100rem) {
    flex-basis: calc(33% - 0.8rem);
  }

  @media (max-width: 87.5rem) {
    flex-basis: calc(50% - 0.8rem);
  }
`;

const Content = styled.div`
  ${props => props.theme.FlexCol};
  font-weight: 500;
  font-size: 18px;

  span:last-child {
    font-weight: 400;
    font-size: 12px;
    color: ${props => props.theme.color.grey.brandColor5};
  }
`;

const StokeItemTitle = styled.span`
  font-size: 1.125rem;
  padding-bottom: 0.625rem;
`;

const StokeCreateAt = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.color.grey.brandColor5};
`;

const TextOverflow = styled.div`
  display: -webkit-box;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
