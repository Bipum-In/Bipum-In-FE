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
  console.log(category);
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

const Select = styled.select``;
