import React from 'react';
import styled from 'styled-components';
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
    <>
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
    </>
  );
}

const DepName = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;

const UserName = styled.div`
  width: 5.8125rem;
  height: 2.5rem;
`;
