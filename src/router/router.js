import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from 'App';
import ROUTER from 'constants/routerConst';
import Layout from 'layout/Layout';
import Rending from 'pages/Rending';
import Login from 'pages/Login';

const EmptyPage = lazy(() => import('pages/EmptyPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const MasterPage = lazy(() => import('pages/master/MasterPage'));
const AppointmentManager = lazy(() =>
  import('pages/master/AppointmentManager')
);

const Management = lazy(() => import('pages/admin/Management'));
const AdminDashBoard = lazy(() => import('pages/admin/AdminDashBoard'));
const EquipmentAdd = lazy(() => import('pages/admin/EquipmentAdd'));
const RequestStatus = lazy(() => import('pages/admin/RequestStatus'));
const EquipmentManagement = lazy(() =>
  import('pages/admin/EquipmentManagement')
);

const UserDashBoard = lazy(() => import('pages/user/UserDashBoard'));
const UserRequest = lazy(() => import('pages/user/UserRequest'));
const UserStockView = lazy(() => import('pages/user/UserStockView'));
const DeleteUserPage = lazy(() => import('pages/DeleteUserPage'));

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
