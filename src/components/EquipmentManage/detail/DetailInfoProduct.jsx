import styled, { css } from 'styled-components';
import Input from 'elements/Input';

export default function DetailInfoProduct({ edit, detail }) {
  const { createdAt, modelName, serialNum } = detail.supplyDetail;
  return (
    <DetailInfoContentContainer>
      <TextType>
        <span>등록 일자</span>
        <CreatedAt edit={edit}>{createdAt}</CreatedAt>
      </TextType>
      <TextType>
        <span>제품명</span>
        <ModelName edit={edit}>{modelName}</ModelName>
      </TextType>
      <TextType>
        <span>시리얼 넘버</span>
        <SerialNum edit={edit}>{serialNum}</SerialNum>
      </TextType>
    </DetailInfoContentContainer>
  );
}

const DetailInfoContentContainer = styled.div`
  div:first-child {
    padding: 0;
    padding-bottom: 1.125rem;
  }

  div:last-child {
    border-bottom: none;
  }
`;

const TextType = styled.div`
  display: flex;
  align-items: center;
  min-width: 13rem;
  padding: 1.125rem 0;
  border-bottom: 1px solid ${props => props.theme.color.grey.brandColor2};

  span {
    font-weight: 500;
    font-size: 0.8125rem;
  }

  span:first-child {
    min-width: 6rem;
    color: ${props => props.theme.color.blue.brandColor6};
  }

  select {
    min-width: 4.5rem;
    height: 2rem;
    color: black;
    padding: 0 0.5rem;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
    margin-right: 0.5rem;
  }

  input {
    height: 2rem;
    color: black;
    margin: 0;
    background-color: ${props => props.theme.color.grey.brandColor1};
    font-weight: 500;
    font-size: 13px;
  }
`;

const CreatedAt = styled.span`
  ${props =>
    props.edit &&
    css`
      display: flex;
      align-items: center;
      height: 2rem;
    `}
`;

const ModelName = styled.span`
  ${props =>
    props.edit &&
    css`
      display: flex;
      align-items: center;
      height: 2rem;
    `}
`;
const SerialNum = styled.span`
  ${props =>
    props.edit &&
    css`
      display: flex;
      align-items: center;
      height: 2rem;
    `}
`;
