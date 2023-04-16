const PATH = {
  MAIN: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DELETE_USER: '/delete-user',
  MYPAGE: '/mypage',
  BACK: -1,
  FRONT: 1,
  ADMIN: {
    DASHBOARD: '/admin-dashboard',
    REQUEST_STATUS: '/request-status',
    EQUIPMENT_MANAGEMENT: '/equipment-management',
    EQUIPMENT_ADD: '/equipment-add',
    MANAGEMENT: '/management',
  },
  USER: {
    DASHBOARD: '/dashboard',
    REQUEST: '/request',
    REQUEST_LIST: '/request-list',
    STOCK_VIEW: '/stockview',
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
