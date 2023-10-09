import { createSlice } from '@reduxjs/toolkit';

// Estado inicial de la app
const initialState = {
  status: 'checking', // 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Todas las acciones escritas acá tienen que ser sincronas
  reducers: {
    login: ( state, { payload } ) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: ( state, { payload } ) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    },
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;