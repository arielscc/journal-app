import { db } from '../firebase/config';
import types from '../types';

export const addOneNewNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
  };
  const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
  dispatch(activeNote(doc.id, newNote));
};

export const getListNotes = (uid) => async (dispatch) => {
  const notes = [];
  const listNotes = await db.collection(`${uid}/journal/notes`).get();
  listNotes.forEach((note) => {
    notes.push({
      id: note.id,
      ...note.data(),
    });
  });
  dispatch(notesList(notes));
};

export const startSaveNote = (note) => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const noteToFirestore = { ...note };
  delete noteToFirestore.id;
  await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
  dispatch(updateNote(note.id, note));
};

export const activeNote = (id, note) => ({
  type: types.notesToActive,
  payload: {
    id,
    ...note,
  },
});

const notesList = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

const updateNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note,
  },
});
