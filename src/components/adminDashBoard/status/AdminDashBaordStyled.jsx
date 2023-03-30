import styled from 'styled-components';

export const EquipmentTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: ${props => (props.useage ? 'flex-end' : 'unset')};
  @media (max-width: ${props => props.theme.screen.dashboardDesktopMaxWidth}) {
    width: 100%;
    min-width: ${props => (props.manage ? '100%' : '260px;')};
  }
`;

const AlertAndAddContainer = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.Boxshadow};
  border: 0.0625rem solid ${props => props.theme.color.grey.brandColor2};
  background-color: white;
  padding: 1.5625rem;
  width: 28.25rem;
  height: 100%;
  min-height: 17.0625rem;
  overflow: hidden;
  @media (max-width: ${props => props.theme.screen.dashboardDesktopMaxWidth}) {
    width: 100%;
    min-width: 19.90625;
  }
`;

export const styleds = {
  EquipmentTopContainer,
  AlertAndAddContainer,
};
