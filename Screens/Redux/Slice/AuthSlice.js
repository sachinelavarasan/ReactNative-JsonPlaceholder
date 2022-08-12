import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authApi from '../api/authApi';

const DELAY = 500;
const initialFormError = {email: '', password: '', otpcode: ''};

const authSlice = createSlice({
  initialState: {
    error: null,
    auth: null,
    isLoading: false,
    formError: initialFormError,
  },
  name: 'auth',
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFormError(state, action) {
      state.formError[action?.payload?.field] = action.payload.message;
    },
    clearFormError(state) {
      state.formError = initialFormError;
    },
  },
});

export const {setAuth, setError, setIsLoading, setFormError, clearFormError} =
  authSlice.actions;

export const signUp = (data, callback) => async dispatch => {
  dispatch(setIsLoading(true));
  try {
    await authApi.signUp(data);
    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch(setFormError(error?.response?.data?.error));
    dispatch(
      setError(error?.response?.data?.message || 'Something went wrong.'),
    );
  } finally {
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, DELAY);
  }
};

export const signIn = (data, callback) => async dispatch => {
  dispatch(setIsLoading(true));
  try {
    
    const response = await authApi.signIn(data);
    console.log(response);
    const user = response.data?.exist;
    await AsyncStorage.setItem('@name', user?.username);
    await AsyncStorage.setItem('@email', user?.email);
    await AsyncStorage.setItem('@password', user?.password);
    await AsyncStorage.setItem('@imageurl', user?.imageurl);

    dispatch(setAuth(user || []));

    if (callback) {
      callback();
    }
  } catch (error) {
    // dispatch(setFormError(error?.response?.data?.error));
    dispatch(
      setError(error?.response?.data?.message || 'Something went wrong.'),
    );
  } finally {
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, DELAY);
  }
};

export const verifyCode = (data, callback) => async dispatch => {
  dispatch(setIsLoading(true));
  try {
    await authApi.verifyCode(data);
    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch(setFormError(error?.response?.data?.error));
    dispatch(
      setError(error?.response?.data?.message || 'Something went wrong.'),
    );
  } finally {
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, DELAY);
  }
};

export const authSelector = state => state.auth;

export default authSlice.reducer;
