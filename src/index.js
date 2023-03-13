import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import App from './App';
import ROUTER from './constants/router';
import store from './redux/config/configStore';
import Singup from './pages/Singup';
import Login from './pages/Login';
import AdminDashBoard from './pages/AdminDashBoard';
import UserDashBoard from './pages/UserDashBoard';
import Rending from './pages/Rending';
import AdminLayout from './pages/AdminLayout';
import { ThemeProvider } from 'styled-components';

const router = createBrowserRouter([
  {
    path: ROUTER.PATH.MAIN,
    element: <App />,
    children: [
      {
        index: true,
        element: <Rending />,
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTER.PATH.ADMIN_DASHBOARD,
            element: <AdminDashBoard />,
          },
          {
            path: ROUTER.PATH.USER_DASHBOARD,
            element: <UserDashBoard />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTER.PATH.SIGNUP,
    element: <Singup />,
  },
  {
    path: ROUTER.PATH.LOGIN,
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
