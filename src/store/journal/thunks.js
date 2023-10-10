// Todas las tareas escritas acá tienen que ser asincronas

import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote } from './';
import { loadNotes } from '../../helpers';

// Creando una nueva nota
export const startNewNote = () => {
  return async( dispatch, getState ) => {

    // Seteando el estado de la nota con 'isSaving: true' comienza a crear la nota
    dispatch( savingNewNote() );

    const { uid } = getState().auth;

    console.log( uid );

    // Para grabar en Firebase usamos el "UID" del usuario
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
    const setDocResp = await setDoc( newDoc, newNote );

    // Seteando el "id" de la nota
    newNote.id = newDoc.id;

    // Guardando la nota en CloudFirestore y seteando el estado de la nota con 'isSaving: false'
    dispatch( addNewEmptyNote( newNote ) );

    // Seteando la nota con 'active: true'
    dispatch( setActiveNote( newNote ) );

  }
}

// Cargando las notas desde CloudFirestore
export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;
    if ( !uid ) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes( uid );

    dispatch( setNote( notes ) );


  }
}