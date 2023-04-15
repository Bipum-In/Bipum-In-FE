import styled from 'styled-components';

export const RequestDetailWrapper = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 0rem;
`;

export const ItemContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: flex-start;
  margin-right: 2.625rem;
`;
export const TypeTitle = styled.span`
  color: ${props => props.theme.color.grey.brandColor5};
  font-size: 0.8125rem;
`;
export const TypeDetailTitle = styled.span`
  font-size: 0.9375rem;
  line-height: 3;
`;

export const TypeDetailMessage = styled.pre`
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  line-height: 2;
  white-space: pre-wrap;
`;
