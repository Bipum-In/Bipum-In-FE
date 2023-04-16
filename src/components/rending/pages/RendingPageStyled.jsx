import styled from 'styled-components';

const Fullpage = styled.div`
  width: 100vw;
`;

const RendingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: space-around;
  align-items: center;
  width: calc(100vw - 5rem);
  height: calc(100vh - 10.25rem);
  margin-top: 10.25rem;
  padding: 1rem 2rem;
  @media (max-width: 87.5rem) {
    ${props => props.theme.FlexCol};
    ${props => props.theme.FlexCenter};
    gap: 2rem;
  }
`;

const RendingTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  align-items: flex-start;
  height: 100%;
  padding: 0 2rem;
  @media (max-width: 87.5rem) {
    height: fit-content;
  }
`;

const RendingBottomContainer = styled.div`
  position: relative;
  width: ${props => (props.small ? '50%' : '80%')};
  height: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
  @media (max-width: 87.5rem) {
    width: 100%;
    height: 50%;
  }
`;

export const styles = {
  Fullpage,
  RendingWrapper,
  RendingTopContainer,
  RendingBottomContainer,
};
