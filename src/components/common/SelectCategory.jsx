import React from 'react';
import styled from 'styled-components';

import STRING from '../../constants/string';
export default function SelectCategory({
  category,
  optionName,
  optionNullName,
  optionKey,
  optionValueKey,
  onChangeCategory,
}) {
  return (
    <Select onChange={onChangeCategory}>
      <option>{optionNullName}</option>
      {category &&
        category.map(value =>
          typeof value === 'string' ? (
            <option key={value} value={value}>
              {value}
            </option>
          ) : (
            <option
              key={value[optionKey]}
              value={JSON.stringify({
                ko: value[optionValueKey],
                eng: STRING.CATEGORY[value[optionValueKey]],
              })}
            >
              {value[optionName]}
            </option>
          )
        )}
    </Select>
  );
}

const Select = styled.select`
  border-radius: 0.375rem;
  border: 0.0625rem solid;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  padding: 0.5rem;

  width: 100%;
  color: ${props => props.theme.color.grey.brandColor7};
  background-color: ${props => props.theme.color.grey.brandColor1};
  border-color: ${props => props.theme.color.grey.brandColor3};

  height: 2.5rem;
  cursor: pointer;
`;
