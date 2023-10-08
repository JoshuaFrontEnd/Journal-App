import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: true,
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
  // Todas las acciones escritas acá tienen que ser asincronas
  reducers: {
    addNewEmptyNote: ( state, action ) => {

    },
    setActiveNote: ( state, action ) => {

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
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
  deleteNoteById
} = journalSlice.actions;