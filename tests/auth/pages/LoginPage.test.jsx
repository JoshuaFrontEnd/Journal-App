// Este archivo de pruebas se creo con la extension ".jsx" debido a que estoy probando un componente, por lo mismo, tambien se creo con la primera letra en mayuscula, siguiendo la convencion de que los archivos de componentes en react deben de comenzar con mayuscula

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailAndPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailAndPassword({ email, password });
  }
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))


const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
});

describe('Pruebas en <LoginPage />', () => {

  beforeEach( () => jest.clearAllMocks() );

  test('debe de renderizar el componente', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

  })

  test('boton de google debe de llamar el startGoogleSignIn', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');

    fireEvent.click( googleBtn );

    expect( mockStartGoogleSignIn ).toHaveBeenCalled();

  })

  test('submit debe de llamar startLoginWithEmailPassword', () => {

    const email = 'email@google.com';
    const password = '123456';

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change( emailField, { target: { name: 'email', value: email }} );

    const passwordField = screen.getByTestId('password');
    fireEvent.change( passwordField, { target: { name: 'password', value: password }} );

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit( loginForm );

    expect( mockStartLoginWithEmailAndPassword ).toHaveBeenCalledWith({
      email, password
    });

  })

});
