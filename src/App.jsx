import { Outlet } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;
