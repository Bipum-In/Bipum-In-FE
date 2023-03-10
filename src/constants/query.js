const COOKIE = {
  COOKIE_NAME: 'myToken',
  REFRESH_NAME: 'myRefreshToken',
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
};

export default QUERY;
