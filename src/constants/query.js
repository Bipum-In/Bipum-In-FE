const COOKIE = {
  COOKIE_NAME: 'DboongToken',
  REFRESH_NAME: 'DboongTokenRefreshToken',
};

const STORAGE = {
  LOCAL_NAME: 'E123QWEFDFA',
};

const END_POINT = {
  USER: {
    EDIT_USER_DATA: '/api/user/',
    MY_PAGE: '/api/user/myPage',
    DELETE_ALL_COOKIES: 'api/user/deleteAllCookies',
    LOGIN_MASTER: '/api/user/login/master',
    LOGOUT: '/api/user/logout',
    ADD_INFO: '/api/user/loginadd',
    CHANGE_PASSWORD: '/api/user/password',
    CHECK_PASSWORD: '/api/user/check',

    GIVE_ROLE: userId => `/api/user/role/${userId}`,
    SEARCH_USER: userId => `/api/user/${userId}`,
    LOGIN_GOOGLE: (code, currentUrl) =>
      `/api/user/login/google?code=${code}&urlType=${currentUrl}`,
    USER_DELETE: (code, urlType) =>
      `/api/user/delete?code=${code}&urlType=${urlType}`,
  },

  DASHBOARD: {
    READ_ALARM: notificationId => `/api/main/read/${notificationId}`,
    ADMIN_ALARM: (page, size) =>
      `/api/admin/main/alarm?page=${page}&size=${size}`,
    USER_ALARM: (page, size) => `/api/main/alarm?page=${page}&size=${size}`,
    SEARCH: (isAdmin, keyword) =>
      `/api${isAdmin}/main/search?keyword=${keyword}`,
    ADMIN_MAIN: status => `/api/admin/main?largeCategory=${status || ''}`,
    USER_MAIN: status => `/api/main?largeCategory=${status || ''}`,
    COMMON_MAIN: status => `/api/main/common?largeCategory=${status || ''}`,
  },

  REQUEST: {
    SEND_PAGE: `/api/requests`,

    PAGE: (isAdmin, keyword, type, status, page, size) =>
      `/api${isAdmin}/requests?keyword=${keyword}&type=${type}&status=${status}&page=${page}&size=${size}`,
    DETAIL: (isAdmin, detailId) => `/api${isAdmin}/requests/${detailId}`,
    USER_REQUESTS: requestId => `/api/requests/${requestId || ''}`,
    ADMIN_RQUESTS: requestId => `/api/admin/requests/${requestId || ''}`,
  },

  PARTNERS: {
    LIST: '/api/partners',

    PAGE: (page, size) => `/api/partners/admin?page=${page}&size=${size}`,
    CHANGE: partnersId => `/api/partners/${partnersId || ''}`,
  },

  SUPPLY: {
    ADD: '/api/supply',
    ADD_EXCEL: '/api/supply/excel',

    CRAWLING_IMG: nameValue => `/api/supply/search?modelNameList=${nameValue}`,
    CHANGE: supplyId => `/api/supply/${supplyId || ''}`,
    PAGE: (isAdmin, keyword, categoryId, status, page, size) =>
      `/api${isAdmin}/supply?keyword=${keyword}&categoryId=${categoryId}&status=${status}&page=${page}&size=${size}`,
    DETAIL: (isAdmin, supplyId, size) =>
      `/api${isAdmin}/supply/${supplyId}?size=${size}`,
    HISTORY: (history, supplyId, page, size) =>
      `/api/supply/history/${history}/${supplyId}?page=${page}&size=${size}`,
    MY: (common, categoryId) => `/api/supply${common}/mysupply/${categoryId}`,
    STOCK: categoryId => `/api/supply/stock/${categoryId}`,
  },

  CATEGORY: {
    LIST: '/api/category',

    CHANGE: categoryId => `/api/category/${categoryId || ''}`,
    MY_LARGE: common => `/api/category${common}/myLargeCategory`,
    MY_SMALL: (common, largeType) =>
      `/api/category${common}/myCategory?largeCategory=${largeType}`,
  },

  DEPARTMENT: {
    LIST: `/api/dept`,

    SEARCH: deptId => `/api/dept/${deptId || ''}`,
    CHANGE: deptId => `/api/dept/${deptId || ''}`,
    MASTER_LIST: `/api/master/dept`,
  },

  NOTIFICATION: {
    SSE_COUNT: role => `/api/notification/count${role || ''}`,
    ALL_DELETE: role => `/api/notification?role=${role}`,
  },

  SSE: domain => `${domain}/api/subscribe`,
};

const QUERY = {
  END_POINT,
  COOKIE,
  STORAGE,
};

export default QUERY;
