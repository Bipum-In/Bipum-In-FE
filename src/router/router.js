import { createBrowserRouter } from 'react-router-dom';

import App from 'App';
import ROUTER from 'constants/routerConst';
import Layout from 'layout/Layout';
import Rending from 'pages/Rending';
import Login from 'pages/Login';
import EmptyPage from 'pages/EmptyPage';
import MyPage from '../pages/MyPage';

import MasterPage from 'pages/master/MasterPage';
import AppointmentManager from 'pages/master/AppointmentManager';

import AdminDashBoard from 'pages/admin/AdminDashBoard';
import Management from 'pages/admin/Management';
import EquipmentAdd from 'pages/admin/EquipmentAdd';
import EquipmentManagement from 'pages/admin/EquipmentManagement';
import RequestStatus from 'pages/admin/RequestStatus';

import UserDashBoard from 'pages/user/UserDashBoard';
import UserRequest from 'pages/user/UserRequest';
import UserStockView from 'pages/user/UserStockView';
import DeleteUserPage from 'pages/DeleteUserPage';

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
        path: ROUTER.PATH.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTER.PATH.MASTER.MASTERPAGE,
        element: <MasterPage />,
      },

      {
        path: ROUTER.PATH.DELETE_USER,
        element: <DeleteUserPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: ROUTER.PATH.ADMIN.DASHBOARD,
            element: <AdminDashBoard />,
          },
          {
            path: ROUTER.PATH.ADMIN.REQUEST_STATUS,
            element: <RequestStatus />,
          },
          {
            path: ROUTER.PATH.ADMIN.EQUIPMENT_MANAGEMENT,
            element: <EquipmentManagement />,
          },
          {
            path: ROUTER.PATH.ADMIN.EQUIPMENT_ADD,
            element: <EquipmentAdd />,
          },
          {
            path: ROUTER.PATH.ADMIN.MANAGEMENT,
            element: <Management />,
          },
          {
            path: ROUTER.PATH.USER.DASHBOARD,
            element: <UserDashBoard />,
          },
          {
            path: ROUTER.PATH.USER.REQUEST,
            element: <UserRequest />,
          },
          {
            path: ROUTER.PATH.USER.REQUEST_LIST,
            element: <RequestStatus />,
          },
          {
            path: ROUTER.PATH.USER.STOCK_VIEW,
            element: <UserStockView />,
          },
          {
            path: ROUTER.PATH.MYPAGE,
            element: <MyPage />,
          },
          {
            path: ROUTER.PATH.MASTER.APPOINTMENT,
            element: <AppointmentManager />,
          },
        ],
      },
    ],
  },
]);

export default router;
