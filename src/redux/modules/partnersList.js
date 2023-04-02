import Axios from 'api/axios';
import Redux from '../redux';

const initialState = {
  partnersList: {
    getPartners: null,
    isPartnersLoading: false,
    isPartnersError: false,
  },
};

const axios = new Axios(process.env.REACT_APP_SERVER_URL);

export const __partnersList = Redux.asyncThunk('PARTNERS', () =>
  axios.get(`/api/partners`)
);

const partnersListSlice = Redux.slice(
  'getPartners',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      __partnersList,
      'partnersList',
      'isPartnersLoading',
      'getPartners',
      'isPartnersError'
    );
  }
);

export default partnersListSlice.reducer;
