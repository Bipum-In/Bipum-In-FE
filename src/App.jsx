import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;
