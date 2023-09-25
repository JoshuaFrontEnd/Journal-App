import { createSlice } from '@reduxjs/toolkit'

// Estado inicial de la app
const initialState = {
  status: 'checking', // 'not-authenticated', 'authenticated'
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
    checkingCredentials: ( state ) => {},
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;