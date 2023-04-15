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

export const getPartnersList = Redux.asyncThunk(
  'PARTNERS',
  payload =>
    axios.get(`/api/partners/admin?page=${payload.page}&size=${payload.size}`),
  response => response.data.data
);

const partnersListSlice = Redux.slice(
  'getPartners',
  initialState,
  {},
  bulider => {
    Redux.extraReducer(
      bulider,
      getPartnersList,
      'partnersList',
      'isPartnersLoading',
      'getPartners',
      'isPartnersError'
    );
  }
);

export default partnersListSlice.reducer;
