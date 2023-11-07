import { createSlice } from '@reduxjs/toolkit';
import { loadNotes } from '../../helpers';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
  // active: {
  //   id: 'ABC123',
  //   title: '',
  //   body: '',
  //   date: 1234567,
  //   imageUrls: []
  // }
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  // Todas las acciones escritas acá tienen que ser sincronas
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {

      state.notes.push( action.payload );
      state.isSaving = false;

    },
    setActiveNote: ( state, action ) => {

      state.active = action.payload;
      state.messageSaved = '';

    },
    setNote: ( state, action ) => {

      state.notes = action.payload;

    },
    setSaving: ( state ) => {

      state.isSaving = true;
      state.messageSaved = '';

    },
    updateNote: ( state, action ) => {

      state.isSaving = false;

      // Como estamos usando Redux, es posible usar un metodo de javascript vanilla para modificar el array de notas, en este caso "map" regresa un nuevo arreglo, basado en el arreglo de notas base
      state.notes = state.notes.map( note => {

        // Si el "id" de la nota en Firestore, es igual al "id" de la nota activa, eso significa que la nota activa ha sido modificada, por lo tanto actualiza en Firestore los datos de esa nota
        if ( note.id === action.payload.id ) {
          return action.payload;
        }

        return note;
      })

      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

    },
    setPhotosToActiveNote: ( state, action ) => {

      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]
      state.isSaving = false;

    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: ( state, action ) => {

    },

  }
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
  clearNotesLogout
} = journalSlice.actions;