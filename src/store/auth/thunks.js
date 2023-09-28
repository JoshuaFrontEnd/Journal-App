import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {

  return async( dispatch ) => {

    // Todas las "acciones despachadas" desde acá se ejecutaran de manera asincrona
    dispatch( checkingCredentials() )

  }
}

// Usualmente a las tareas asincronas, se les coloca "start" al principio para indicar que es una tarea asincrona
export const startGoogleSignIn = () => {

  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();

    // Si sucede un error, tendre el mensaje de error seteado acá
    if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

    dispatch( login( result ) );

  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async( dispatch ) => {

    dispatch( checkingCredentials() );

    const resp = registerUserWithEmailPassword({ email, password, displayName });

    console.log( resp );

  }
}


/* ----------------------------------------------------------------

 Thunks

 Los "Thunks" son "acciones" que pueden ser "despachadas" pero internamente tienen tareas asincronas

---------------------------------------------------------------- */