//Configurando los proveedores de Sign In

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

// Creando una nueva instancia de esta funcion
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

  try {

    // Configurando el popup de Google Sign In
    const result = await signInWithPopup( FirebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );

    // Obteniendo el usuario
    // const user = result.user;
    // console.log( { user } );

    const { displayName, email, photoURL, uid } = result.user;
    // console.table( [ displayName, email, photoURL, uid ] );

    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch ( error ) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }

}