// Todas las tareas escritas acá tienen que ser asincronas

import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';

export const startNewNote = () => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;

    console.log( uid );

    // Para grabar en Firebase usamos el 'UID' del usuario
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
    const setDocResp = await setDoc( newDoc, newNote );

    console.log( {newDoc, setDocResp} );

  }
}