import { checkingCredentials } from './';

export const checkingAuthentication = ( email, password ) => {

  return async( dispatch ) => {

    // Todas las "acciones despechadas" desde acá se ejecutaran de manera asincrona
    dispatch( checkingCredentials() )

  }
}

// Usualmente a las tareas asincronas, se les coloca "start" al principio para indicar que es una tarea asincrona
export const startGoogleSignIn = () => {

  return async( dispatch ) => {

    dispatch( checkingCredentials() )

  }
}


/* ----------------------------------------------------------------

 Thunks

 Los "Thunks" son "acciones" que pueden ser "despachadas" pero internamente tienen tareas asincronas

---------------------------------------------------------------- */