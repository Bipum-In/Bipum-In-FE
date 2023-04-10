import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from 'styles/globalStyle';
import theme from 'styles/theme';

import store from 'redux/config/configStore';
import { ThemeProvider } from 'styled-components';
import router from 'router/router';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
