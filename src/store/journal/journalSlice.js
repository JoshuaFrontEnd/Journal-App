import { createSlice } from '@reduxjs/toolkit';

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

    },
    setNote: ( state, action ) => {

    },
    setSaving: ( state, action ) => {

    },
    updateNote: ( state, action ) => {

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
  deleteNoteById
} = journalSlice.actions;