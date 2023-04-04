import ROUTER from './routerConst';

const SIDEBAR = {
  SIDEBAR_STYLE(pathname, isAdmin) {
    return isAdmin
      ? [
          pathname === ROUTER.PATH.ADMIN.DASHBOARD && true,
          pathname === ROUTER.PATH.ADMIN.REQUEST_STATUS && true,
          pathname === ROUTER.PATH.ADMIN.EQUIPMENT_MANAGEMENT && true,
          pathname === ROUTER.PATH.ADMIN.EQUIPMENT_ADD && true,
          pathname === ROUTER.PATH.ADMIN.MANAGEMENT && true,
        ]
      : [
          pathname === ROUTER.PATH.USER.DASHBOARD && true,
          pathname === ROUTER.PATH.USER.REQUEST && true,
          pathname === ROUTER.PATH.USER.REQUEST_LIST && true,
          pathname === ROUTER.PATH.USER.STOCK_VIEW && true,
        ];
  },
};

const ARRAY = {
  SIDEBAR,
};

export default ARRAY;
