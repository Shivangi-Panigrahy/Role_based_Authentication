import client, {
    REGISTER_CUSTOMER,
    REGISTER_ADMIN,
    LOGIN_ADMIN,
    VERIFY_EMAIL,
    ME
  } from '../../services/graphql.service';
  import {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    verifyEmailStart,
    verifyEmailSuccess,
    verifyEmailFailure
  } from './authSlice';
  
  // Register a customer
  export const registerCustomer = (userData) => async (dispatch) => {
    dispatch(registerStart());
    try {
      const { data } = await client.mutate({
        mutation: REGISTER_CUSTOMER,
        variables: userData
      });
      dispatch(registerSuccess(data.registerCustomer));
      return data.registerCustomer;
    } catch (error) {
      const errorMsg = error.message || 'Registration failed';
      dispatch(registerFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };
  
  // Register an admin
  export const registerAdmin = (userData) => async (dispatch) => {
    dispatch(registerStart());
    try {
      const { data } = await client.mutate({
        mutation: REGISTER_ADMIN,
        variables: userData
      });
      dispatch(registerSuccess(data.registerAdmin));
      return data.registerAdmin;
    } catch (error) {
      const errorMsg = error.message || 'Registration failed';
      dispatch(registerFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };
  
  // Login admin
  export const loginAdmin = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_ADMIN,
        variables: credentials
      });
      dispatch(loginSuccess(data.loginAdmin));
      return data.loginAdmin;
    } catch (error) {
      const errorMsg = error.message || 'Login failed';
      dispatch(loginFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };
  
  // Verify email
  export const verifyEmail = (token) => async (dispatch) => {
    dispatch(verifyEmailStart());
    try {
      const { data } = await client.mutate({
        mutation: VERIFY_EMAIL,
        variables: { token }
      });
      dispatch(verifyEmailSuccess(data.verifyEmail));
      return data.verifyEmail;
    } catch (error) {
      const errorMsg = error.message || 'Email verification failed';
      dispatch(verifyEmailFailure(errorMsg));
      throw new Error(errorMsg);
    }
  };
  
  // Get current user
  export const getCurrentUser = () => async (dispatch) => {
    dispatch(loginStart());
    try {
      const { data } = await client.query({
        query: ME,
        fetchPolicy: 'network-only'
      });
      if (data.me) {
        dispatch(loginSuccess({ user: data.me, token: localStorage.getItem('token') }));
      } else {
        dispatch(loginFailure('Authentication failed'));
      }
    } catch (error) {
      dispatch(loginFailure('Authentication failed'));
    }
  };