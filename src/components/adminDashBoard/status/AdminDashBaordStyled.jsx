import styled from 'styled-components';

export const EquipmentTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  @media (max-width: ${props => props.theme.screen.fullWideDesktop}) {
    width: 100%;
  }
`;

const AlertAndAddContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.Boxshadow};
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  background-color: white;
  padding: 1.5625rem;
  width: 28.25rem;
  min-height: 19.5rem;
`;

export const styleds = {
  EquipmentTopContainer,
  AlertAndAddContainer,
};
