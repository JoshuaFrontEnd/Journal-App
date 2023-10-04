//Este archivo se crea para configurar los proveedores de autentificacion de manera ordenada, aunque podria escribirse perfectamente en el archivo de configuracion de firebase

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Creando una nueva instancia de esta funcion
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

  try {

    // Si la petición es correcta configuro el popup de Google SignIn, le tengo que pasar la accion de acceso "(FirebaseAuth)" y el proveedor, en este caso el login de google "(googleProvider)"
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );

    // Obteniendo el usuario
    // const user = result.user;
    // console.log( { user } );

    // Desestructuro los datos que necesito desde el usuario
    const { displayName, email, photoURL, uid } = result.user;
    // console.table( [ displayName, email, photoURL, uid ] );

    // Y seteo una respuesta que me servira para poder hacer las peticiones correspondientes desde el "Thunks", en este caso lo importante es setear un objeto que tenga el valor de una respuesta correcta, en este caso declaro un valor "ok" con el valor de "true", y envio las propiedades que necesitare agregar al estado actualizado
    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch ( error ) {

    // Si la peticion falla, tengo que capturar el mensaje de error de "FireBase" y setear un objeto que tenga el valor de una respuesta incorrecta, en este caso declaro un objeto con la primera propiedad "ok" con el valor de "false" y agrego el valor del mensaje con "errorMessage"
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}

export const registerUserWithEmailPassword = async( {email, password, displayName} ) => {

  try {

    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );

    const { uid, photoURL } = resp.user;

    console.log( resp );

    // Actualizar el "displayName" en Firebase del usuario actual
    await updateProfile( FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch ( error ) {

    console.log( error );
    return { ok: false, errorMessage: error.message }

  }

}

export const loginWithEmailAndPassword = async({ email, password }) => {

  try {

    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );

    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid, photoURL, displayName, email
    }

  } catch ( error ) {

    const errorMessage = error.message;

    // console.log( errorMessage );

    return {
      ok: false,
      errorMessage
    }

  }

}

// Funcion para "cerrar sesion" en Firebase
export const logoutFirebase = async() => {

  return await FirebaseAuth.signOut();

 }