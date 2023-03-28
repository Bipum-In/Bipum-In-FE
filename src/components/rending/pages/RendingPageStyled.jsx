import styled from 'styled-components';

const Fullpage = styled.div`
  width: 100vw;
  height: 100vh;
`;

const RendingWrapper = styled.div`
  ${props => props.theme.FlexCenter};
  ${props => (props.col ? props.theme.FlexCol : props.theme.FlexRow)};
  ${props => props.theme.wh100};
  padding: 1rem 2rem;
`;

export const styles = {
  Fullpage,
  RendingWrapper,
};
