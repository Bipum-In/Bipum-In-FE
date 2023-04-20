import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { retryLazy } from 'utils/retryLazy';

import App from 'App';
import ROUTER from 'constants/routerConst';
import Layout from 'layout/Layout';
import Rending from 'pages/Rending';
import Login from 'pages/Login';

const EmptyPage = retryLazy(() => import('pages/EmptyPage'));
const MyPage = retryLazy(() => import('../pages/MyPage'));
const MasterPage = retryLazy(() => import('pages/master/MasterPage'));
const AppointmentManager = retryLazy(() =>
  import('pages/master/AppointmentManager')
);

const Management = retryLazy(() => import('pages/admin/Management'));
const AdminDashBoard = retryLazy(() => import('pages/admin/AdminDashBoard'));
const EquipmentAdd = retryLazy(() => import('pages/admin/EquipmentAdd'));
const RequestStatus = retryLazy(() => import('pages/admin/RequestStatus'));
const EquipmentManagement = retryLazy(() =>
  import('pages/admin/EquipmentManagement')
);

const UserDashBoard = retryLazy(() => import('pages/user/UserDashBoard'));
const UserRequest = retryLazy(() => import('pages/user/UserRequest'));
const UserStockView = retryLazy(() => import('pages/user/UserStockView'));
const DeleteUserPage = retryLazy(() => import('pages/DeleteUserPage'));

const router = createBrowserRouter([
  {
    path: ROUTER.PATH.MAIN,
    element: <App />,
    errorElement: (
      <Suspense fallback={null}>
        <EmptyPage />
      </Suspense>
    ),
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
        element: (
          <Suspense fallback={null}>
            <MasterPage />,
          </Suspense>
        ),
      },
      {
        path: ROUTER.PATH.DELETE_USER,
        element: (
          <Suspense fallback={null}>
            <DeleteUserPage />,
          </Suspense>
        ),
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
