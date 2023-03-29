import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import ROUTER from '../constants/routerConst';
import Layout from '../layout/Layout';
import Singup from '../pages/Singup';
import Login from '../pages/Login';
import AdminDashBoard from '../pages/admin/AdminDashBoard';
import UserDashBoard from '../pages/user/UserDashBoard';
import UserRequest from '../pages/user/UserRequest';
import Rending from '../pages/Rending';
import EmptyPage from '../pages/EmptyPage';

import EquipmentAdd from '../pages/admin/EquipmentAdd';
import RequestStatus from '../pages/admin/RequestStatus';
import EquipmentManagement from '../pages/admin/EquipmentManagement';
import UserStockView from '../pages/user/UserStockView';

const router = createBrowserRouter([
  {
    path: ROUTER.PATH.MAIN,
    element: <App />,
    errorElement: <EmptyPage />,
    children: [
      {
        index: true,
        element: <Rending />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: ROUTER.PATH.ADMIN_DASHBOARD,
            element: <AdminDashBoard />,
          },
          {
            path: ROUTER.PATH.ADMIN_REQUEST_STATUS,
            element: <RequestStatus />,
          },
          {
            path: ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT,
            element: <EquipmentManagement />,
          },
          {
            path: ROUTER.PATH.ADMIN_EQUIPMENT_ADD,
            element: <EquipmentAdd />,
          },
          {
            path: ROUTER.PATH.USER_DASHBOARD,
            element: <UserDashBoard />,
          },
          {
            path: ROUTER.PATH.USER_REQUEST,
            element: <UserRequest />,
          },
          {
            path: ROUTER.PATH.USER_STOCK_VIEW,
            element: <UserStockView />,
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
  {
    path: '/api/user/kakao/callback',
    element: <Login />,
  },
]);

export default router;
