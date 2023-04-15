import React from 'react';
import styled from 'styled-components';
import {
  RequestDetailWrapper,
  ItemContainer,
  TypeTitle,
  TypeDetailTitle,
  TypeDetailMessage,
} from './Styled';

import STRING from 'constants/string';
import Input from 'elements/Input';

export default function UserRequestItem({
  useType,
  editMode,
  categoryName,
  content,
  requestType,
  serialNum,
  handleContentChange,
}) {
  return (
    <>
      <RequestDetailWrapper>
        <ItemContainer>
          <TypeTitle>종류</TypeTitle>
          <TypeDetailTitle>{categoryName}</TypeDetailTitle>
        </ItemContainer>
        <ItemContainer>
          <TypeTitle>사용처</TypeTitle>
          <TypeDetailTitle>{useType}</TypeDetailTitle>
        </ItemContainer>
        {requestType !== STRING.REQUEST_NAME.SUPPLY && (
          <ItemContainer>
            <TypeTitle>시리얼 넘버</TypeTitle>
            <TypeDetailTitle>{serialNum}</TypeDetailTitle>
          </ItemContainer>
        )}
      </RequestDetailWrapper>
      <InputDetailWrapper>
        <InputItemContainer>
          <TypeTitle>
            요청
            {requestType !== STRING.REQUEST_NAME.SUPPLY ? '사유' : '메시지'}
          </TypeTitle>
          <TypeDetailMessage>
            {editMode ? (
              <ContentInput>
                <Input defaultValue={content} setState={handleContentChange} />
              </ContentInput>
            ) : (
              content
            )}
          </TypeDetailMessage>
        </InputItemContainer>
      </InputDetailWrapper>
    </>
  );
}

const ContentInput = styled.label`
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  background: ${props => props.theme.color.grey.brandColor1};
`;

const InputDetailWrapper = styled.div`
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: flex-start;
  margin-bottom: 0rem;
`;

const InputItemContainer = styled(ItemContainer.withComponent('div'))`
  margin-right: 0;
`;
