import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from 'styles/commonIcon/arrowDown.svg';

import STRING from 'constants/string';

export default function SelectCategory({
  category,
  optionName,
  optionNullName,
  optionKey,
  optionValueKey,
  onChangeCategory,
}) {
  return (
    <SelectWrapper>
      <Select onChange={onChangeCategory} value={optionNullName}>
        <option value={optionNullName} disabled hidden>
          {optionNullName}
        </option>
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
      <ArrowIcon>
        <ArrowDown />
      </ArrowIcon>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  pointer-events: none;

  path {
    stroke: ${props => props.theme.color.blue.brandColor5};
  }
`;

const Select = styled.select`
  max-width: 9.375rem;
  width: 100%;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid;
  padding: 0.5rem;
  padding-right: 2rem;
  font-weight: 600;
  line-height: 1.3125rem;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
