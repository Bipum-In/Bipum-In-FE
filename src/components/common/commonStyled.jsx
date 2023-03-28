import styled, { css } from 'styled-components';

const SelectCaregoryConteiner = styled.div`
  display: flex;
  gap: 0.5rem;
  select {
    min-width: 5.25rem;
    height: 2.6rem;
    border-color: ${props => props.theme.color.blue.brandColor3};
    color: ${props => props.theme.color.blue.brandColor6};
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;

const TypeTitle = styled.span`
  font-size: 1rem;
  width: ${props => (props.kakao ? 'fit-content;' : '8.75rem')};
  margin-right: ${props => (props.kakao ? '1.5rem' : 0)};
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

const TypeBox = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  Input {
    height: 2.5rem;
    background: ${props => props.theme.color.grey.brandColor1};
    border-radius: 0.5rem;
  }
`;

export const styles = {
  TypeTitle,
  SelectCaregoryConteiner,
  TypeBox,
};
