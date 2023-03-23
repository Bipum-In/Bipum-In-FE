import React from 'react';
import styled, { css } from 'styled-components';
import SelectCategory from '../../common/SelectCategory';

export default function SelectUser({
  category,
  optionNullName,
  optionKey,
  optionValueKey,
  optionName,
  onChangeCategory,
}) {
  return (
    <TypeBox>
      <TypeTitle>사용자</TypeTitle>
      <DepName>
        <SelectCategory
          category={category[0]}
          optionNullName={optionNullName[0]}
          optionKey={optionKey[0]}
          optionValueKey={optionValueKey[0]}
          optionName={optionName[0]}
          onChangeCategory={onChangeCategory[0]}
        />
      </DepName>
      <UserName>
        <SelectCategory
          category={category[1]}
          optionNullName={optionNullName[1]}
          optionKey={optionKey[1]}
          optionValueKey={optionValueKey[1]}
          optionName={optionName[1]}
          onChangeCategory={onChangeCategory[1]}
        />
      </UserName>
    </TypeBox>
  );
}

const TypeBox = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 0.5rem;
  width: 37rem;
  height: 2.5rem;
  Input {
    width: 28.125rem;
    height: 2.5rem;
    background: ${props => props.theme.color.grey.brandColor1};
    border-radius: 0.5rem;
  }
`;

const TypeTitle = styled.span`
  font-size: 1.125rem;
  width: 8.75rem;
  ${props =>
    props.requiredinput === 'true' &&
    css`
      &::before {
        content: '*';
        color: red;
        padding-right: 0.3125rem;
      }
    `}
`;

const DepName = styled.div`
  ${props => props.theme.FlexRow};
  width: 5.8125rem;
  height: 2.5rem;
`;

const UserName = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;
