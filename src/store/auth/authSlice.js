import { createSlice } from '@reduxjs/toolkit';

// Estado inicial de la app
const initialState = {
  status: 'not-authenticated', // 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: ( state, action ) => {},
    logout: ( state, payload ) => {},
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    },
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;