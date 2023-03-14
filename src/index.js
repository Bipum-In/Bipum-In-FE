import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import store from './redux/config/configStore';
import { ThemeProvider } from 'styled-components';
import router from './router/router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
