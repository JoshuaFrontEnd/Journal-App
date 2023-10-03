import { loginWithEmailAndPassword, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {

  return async( dispatch ) => {

    // Todas las "acciones despachadas" desde acá se ejecutaran de manera asincrona
    dispatch( checkingCredentials() )

  }
}

// Usualmente a las tareas asincronas, se les coloca "start" al principio para indicar que es una tarea asincrona

// Función para hacer login con google SignIn
export const startGoogleSignIn = () => {

  return async( dispatch ) => {

    // Seteo el estado en "checking" llamando a la accion "checkingCredentials" del "authSlice", esto me sirve para que mientras hago las peticiones asincronas la aplicación quede en un estado de "espera" lo cual sirve para mostrar un "loading", deshabilitar botones, etc
    dispatch( checkingCredentials() );

    // Llamo a la petición (tarea asincrona) "signInWithGoogle", declarada en "providers.js"
    const result = await signInWithGoogle();

    // Si el resultado es un error (false), seteo el mensaje de error de firebase y el estado llamando a la accion "logout" del "authSlice"
    if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

    // Si no existe error (true), despacho el estado de autentificación llamando a la accion "login" del "authSlice"
    dispatch( login( result ) );

  }
}

// Función para registrar un usuario en Firebase ingresando un email, password y nombre desde un formulario, el email, password y displayName son desestructurados del "formState" que pase como argumento al llamar la funcion desde "RegisterPage"
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

  return async( dispatch ) => {

    // Seteo el estado en "checking" llamando a la accion "checkingCredentials" del "authSlice", esto me sirve para que mientras hago las peticiones asincronas la aplicación quede en un estado de "espera" lo cual sirve para mostrar un "loading", deshabilitar botones, etc
    dispatch( checkingCredentials() );

    // Llamo a la accion (tarea asincrona) "registerUserWithEmailPassword" del "provider.js" y desestructuro los datos que necesito
    const { ok, uid, photoURL, errorMessage } =
    await registerUserWithEmailPassword({ email, password, displayName });

    // Si el valor de "ok" (declarado en "providers.js") es false, seteo el mensaje de error de firebase y el estado llamando a la accion "logout" del "authSlice"
    if ( !ok ) return dispatch( logout({ errorMessage }) );

    // Si no existe error (true), despacho el estado de autentificación llamando a la accion "login" del "authSlice"
    dispatch( login({ uid, displayName, email, photoURL }) );

  }

}

// Función para hacer login con formulario usando un email y password registrado anteriormente en firebase, el email y password son desestructurados del "formState" que pase como argumento al llamar la funcion desde "LoginPage"
export const startLoginWithEmailAndPassword = ({ email, password }) => {

  return async( dispatch ) => {

    // Seteo el estado en "checking" llamando a la accion "checkingCredentials" del "authSlice", esto me sirve para que mientras hago las peticiones asincronas la aplicación quede en un estado de "espera" lo cual sirve para mostrar un "loading", deshabilitar botones, etc
    dispatch( checkingCredentials() );

    // Llamo a la petición (tarea asincrona) "loginWithEmailAndPassword", declarada en "providers.js" pasandole el email y password
    const result = await loginWithEmailAndPassword({ email, password });

    console.log( result );

    // Si el resultado es un error (false), seteo el mensaje de error de firebase y el estado llamando a la accion "logout" del "authSlice"
    if ( !result.ok ) return dispatch( logout( result ) );

    // Si no existe error (true), despacho el estado de autentificación llamando a la accion "login" del "authSlice"
    dispatch( login( result ) );

  }

}

/* ----------------------------------------------------------------

 Thunks

 - Estas son las acciones que seran despachadas desde los componentes, estas acciones llaman a los Providers
 - Los "Thunks" son "acciones" que pueden ser "despachadas" pero internamente tienen tareas asincronas

---------------------------------------------------------------- */