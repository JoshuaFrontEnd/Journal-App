// Todas las tareas escritas acá tienen que ser asincronas

import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers';

// Creando una nueva nota
export const startNewNote = () => {
  return async( dispatch, getState ) => {

    // Seteando el estado de la nota con 'isSaving: true' comienza a crear la nota
    dispatch( savingNewNote() );

    // Obtengo el "id" del usuario
    const { uid } = getState().auth;

    // Creo el objeto con la estructura de datos de la nota
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    // Para grabar en Firebase usamos el "id (uid)" del usuario
    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
    const setDocResp = await setDoc( newDoc, newNote );

    // Para identificar las notas, en el arreglo que voy a crear con las mismas en el "state", le asigno a cada nota el "id" que me genera Firebase al crear un documento, este "id" no se agrega por cada nota en Firecloud, no es necessario, ya que ahí la referencia de la nota se hace hacia el documento
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

// Guardando la nota activa que ha sido editada con nuevos datos
export const startSaveNote = (val) => {
  return async( dispatch, getState ) => {

    dispatch( setSaving() );

    // Traigo el "id" del usuario
    const { uid } = getState().auth;

    // Traigo la nota activa que ha sido editada
    const { active:noteActive } = getState().journal;

    // La nota activa la "esparzo" guardandola en una nueva variable
    const noteToFirestore = { ...noteActive };

    // De los datos de esa variable de tipo objeto elimino la propiedad "id" que viene de los datos creados al momento de insertarla en el arreglo de notas del "state", esto se hace, ya que en Firebase la nota no se guarda con "id", por que se hace referencia a ella mediante los documentos de Firestore
    delete noteToFirestore.id;

    // Hago la referencia al "documento" de Firebase, para obtener la nota activa que necesito actualizar
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ noteActive.id }` );

    // Guardo la nota activa editada en la base de datos de Firestore, y con la opcion "merge" combino la informacion del objeto editado, con el objeto que existe en la base de datos, esto se hace, para que se actualo
    await setDoc( docRef, noteToFirestore, { merge: true } );

    dispatch( updateNote( noteActive ) );

  }
}