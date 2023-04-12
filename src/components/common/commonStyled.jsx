import styled, { css } from 'styled-components';

const SelectCaregoryConteiner = styled.div`
  display: flex;
  gap: 0.5rem;
  select {
    width: auto;
    height: 2.6rem;
    border-color: ${props => props.theme.color.blue.brandColor3};
    color: ${props => props.theme.color.blue.brandColor6};
    background-color: ${props => props.theme.color.blue.brandColor1};
  }
`;

const TypeTitle = styled.span`
  font-size: 1rem;
  width: ${props => (props.dept ? '7rem' : '12.75rem')};
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
  position: relative;
  ${props => props.theme.FlexRow};
  align-items: center;
  gap: 0.5rem;
  Input {
    height: 2.5rem;
    background: ${props => props.theme.color.grey.brandColor1};
    border-radius: 0.5rem;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const AddEquipmentWrapper = styled.section`
  ${props => props.theme.wh100};
  height: ${props =>
    props.mypage ? 'calc(100vh - 12.8125rem);' : 'calc(100vh - 16.6875rem);'};
  display: flex;
  overflow: hidden;
  position: relative;
`;

const PartnerCompany = styled.div`
  ${props => props.theme.FlexRow};
  align-items: center;
  min-width: 5.8125rem;
  height: 2.5rem;
`;

const AddEquipmentArticle = styled.form`
  ${props => props.theme.FlexCol};
  width: 100%;
  padding: 4.5rem 8.75rem;
  justify-content: center;

  @media (max-width: 103.75rem) {
    display: block;
    overflow-y: scroll;
  }
`;

const EquipmentDetailContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: center;
  min-height: 30.625rem;

  @media (max-width: 103.75rem) {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    & > div {
      background-color: transparent;
      padding-bottom: 3rem;
    }
  }
`;

const EquipmentLeftContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: center;
  gap: 3.125rem;
`;

const Hr = styled.div`
  height: 100%;
  width: 0.0625rem;
  background-color: ${props => props.theme.color.grey.brandColor2};
  margin: 0 5rem;
`;

const SubminPostContainer = styled.div`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  padding: 3rem 0 1rem;
  width: 100%;
`;

const SelectBox = styled.div`
  ${props => props.theme.FlexRow};
  color: ${props => props.theme.color.grey.brandColor7};
  gap: 0.5rem;

  select {
    width: auto;
    border: 1px solid ${props => props.theme.color.grey.brandColor3};
    background-color: ${props => props.theme.color.grey.brandColor1};
    margin-right: 0.2rem;
  }

  path {
    stroke: ${props => props.theme.color.grey.brandColor7};
  }
`;

const CategoryInputContainer = styled.div`
  width: 8rem;
`;

const ImageContainer = styled.div`
  margin-left: 8.8125rem;

  @media (max-width: 103.75rem) {
    margin-left: 0;
  }
`;

const TextArea = styled.textarea`
  width: 30.875rem;
  height: 10rem;
  margin: auto;
  padding: 1rem;
  padding: 1rem;
  background: ${props => props.theme.color.grey.brandColor1};
  border-radius: 0.25rem;
  border: none;
  resize: none;
`;

export const styles = {
  TypeTitle,
  SelectCaregoryConteiner,
  TypeBox,
  AddEquipmentWrapper,
  AddEquipmentArticle,
  EquipmentDetailContainer,
  EquipmentLeftContainer,
  Hr,
  SubminPostContainer,
  SelectBox,
  CategoryInputContainer,
  PartnerCompany,
  ImageContainer,
  TextArea,
};
