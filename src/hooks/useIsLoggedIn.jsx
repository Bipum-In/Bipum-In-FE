import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QUERY from 'constants/query';
import { loginSuccess, logoutSuccess } from 'redux/modules/authSlice';

export function useIsLoggedIn() {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedInLocalStorage = !!localStorage.getItem(
      QUERY.STORAGE.LOCAL_NAME
    );
    if (isLoggedIn !== isLoggedInLocalStorage) {
      dispatch(isLoggedInLocalStorage ? loginSuccess() : logoutSuccess());
    }
  }, [dispatch, isLoggedIn]);

  return isLoggedIn;
}
