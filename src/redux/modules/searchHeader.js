import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  searchData: {
    search: null,
    isSearchError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const getSearch = Redux.asyncThunk(
  'SEARCH_HEADER',
  payload =>
    axios.get(`/api${payload.isAdmin}/main/search?keyword=${payload.keyword}`),
  response => response.data.data
);

const setSearch = (state, payload) => {
  const searchKey = Object.keys(payload)[0];
  return { [searchKey]: payload };
};

const searchHeader = Redux.slice(
  'Search',
  initialState,
  {
    initSearchHeader: state => {
      state.searchData.search = null;
      state.searchData.isSearchError = false;
    },
  },
  bulider => {
    Redux.extraReducer(
      bulider,
      getSearch,
      'searchData',
      '',
      'search',
      'isSearchError',
      setSearch
    );
  }
);

export const { initSearchHeader } = searchHeader.actions;
export default searchHeader.reducer;
