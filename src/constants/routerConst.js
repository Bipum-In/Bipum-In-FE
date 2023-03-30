const PATH = {
  MAIN: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  BACK: -1,
  FRONT: 1,
  ADMIN: {
    DASHBOARD: '/admin-dashboard',
    REQUEST_STATUS: '/request-status',
    EQUIPMENT_MANAGEMENT: '/equipment-management',
    EQUIPMENT_ADD: '/equipment-add',
  },
  USER: {
    DASHBOARD: '/user-dashboard',
    REQUEST: '/user-request',
    STOCK_VIEW: '/user-stockview',
  },
};

const NAME = {
  ADD: 'add',
  LOGIN: 'login',
  SIGNIN: 'signIn',
};

const ROUTER = {
  PATH,
  NAME,
};

export default ROUTER;
