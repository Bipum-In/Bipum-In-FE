import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function StockViewList({ requestData, onClickDetail }) {
  const { content } = requestData;

  return (
    <StockWrapper>
      <CardContainer>
        {content.map(item => (
          <Card
            key={uuidv4()}
            onClick={() => {
              onClickDetail(item.supplyId);
            }}
          >
            <img src={item.image} alt="" />
            <Content>
              <span>{item.modelName}</span>
              <span>{item.createdAt}</span>
            </Content>
          </Card>
        ))}
      </CardContainer>
    </StockWrapper>
  );
}

const StockWrapper = styled.section`
  padding: 0 5.3125rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 21.125rem;
  height: 10rem;
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
