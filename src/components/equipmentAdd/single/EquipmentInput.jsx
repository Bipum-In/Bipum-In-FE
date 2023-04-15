import React from 'react';
import styled, { css } from 'styled-components';

import Input from 'elements/Input';
import Button from 'elements/Button';

import { ReactComponent as AddImgIcon } from 'styles/commonIcon/addImg.svg';

export default function EquipmentInput({ value, setValue, onCrawling }) {
  return (
    <>
      <TypeBox>
        <TypeTitle requiredinput="true">제품명</TypeTitle>
        <Input
          type="text"
          value={value[0]}
          setState={setValue[0]}
          maxLength="30"
          placeholder="제품명을 기입해주세요"
        />
        <Button
          submit
          crawling
          onClick={onCrawling}
          disabled={value[0].length < 2}
        >
          <AddImgIcon />
          사진 자동 첨부
        </Button>
      </TypeBox>
      <TypeBox>
        <TypeTitle requiredinput="true">시리얼 넘버</TypeTitle>
        <Input
          value={value[1]}
          setState={setValue[1]}
          placeholder="시리얼넘버를 기입해주세요"
        />
      </TypeBox>
    </>
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
  font-size: 1rem;
  min-width: 8.75rem;
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
