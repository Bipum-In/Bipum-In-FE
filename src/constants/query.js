const COOKIE = {
  COOKIE_NAME: 'DboongToken',
  REFRESH_NAME: 'DboongTokenRefreshToken',
};

const STORAGE = {
  LOCAL_NAME: 'E123QWEFDFA',
};

const AXIOS_PATH = {
  LOCAL: 'http://localhost:3000',
  SERCH(pageNum, keyWord) {
    return `/api/search/posts?page=${pageNum}&size=10&sortBy=wishCount&keyword=${keyWord}`;
  },
};

const QUERY = {
  AXIOS_PATH,
  COOKIE,
  STORAGE,
};

export default QUERY;
