import ROUTER from './routerConst';

const SIDEBAR = {
  SIDEBAR_STYLE(pathname, isAdmin) {
    return isAdmin
      ? [
          pathname === ROUTER.PATH.ADMIN_DASHBOARD && true,
          pathname === ROUTER.PATH.ADMIN_REQUEST_STATUS && true,
          pathname === ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT && true,
          pathname === ROUTER.PATH.ADMIN_EQUIPMENT_ADD && true,
        ]
      : [
          pathname === ROUTER.PATH.ADMIN_DASHBOARD && true,
          pathname === ROUTER.PATH.ADMIN_REQUEST_STATUS && true,
          pathname === ROUTER.PATH.ADMIN_EQUIPMENT_MANAGEMENT && true,
          pathname === ROUTER.PATH.ADMIN_EQUIPMENT_ADD && true,
        ];
  },
};

const ARRAY = {
  SIDEBAR,
};

export default ARRAY;
