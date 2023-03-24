import React from 'react';
import styled, { css } from 'styled-components';

import STRING from '../../constants/string';
export default function SelectCategory({
  category,
  optionName,
  optionNullName,
  optionKey,
  optionValueKey,
  onChangeCategory,
  eqtype,
}) {
  return (
    <Select onChange={onChangeCategory} eqtype={eqtype}>
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

  ${props =>
    props.eqtype === 'true'
      ? css`
          width: 14.125rem;
          color: ${props => props.theme.color.blue.brandColor6};
          background-color: ${props.theme.color.blue.brandColor1};
          border-color: ${props => props.theme.color.blue.brandColor6};
          &::before {
            color: ${props => props.theme.color.blue.brandColor6};
          }
        `
      : css`
          width: 100%;
          color: ${props => props.theme.color.grey.brandColor7};
          background-color: ${props.theme.color.grey.brandColor1};
          border-color: ${props => props.theme.color.grey.brandColor3};
        `}
  height: 2.5rem;
  cursor: pointer;
`;
