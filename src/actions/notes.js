import Swal from 'sweetalert2';

import { db } from '../firebase/config';
import types from '../types';

export const addOneNewNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    url: null,
  };
  const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
  dispatch(activeNote(doc.id, newNote));
  dispatch(addNewNote(doc.id, newNote));
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
  Swal.fire({
    title: 'Saved!',
    text: note.title,
    icon: 'success',
  });
};
export const startUploadImage = (file) => async (dispatch, getState) => {
  // Swal
  Swal.fire({
    title: 'Uploading file...',
    text: 'Please wait...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const { active: activeNote } = getState().notes;

  const cloudUrl = 'https://api.cloudinary.com/v1_1/arielchura/image/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'journal-app');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, { method: 'POST', body: formData });
    if (resp.ok) {
      const cloudResp = await resp.json();
      const fileUrl = cloudResp.secure_url;
      activeNote.url = fileUrl;
      console.log(activeNote);
      dispatch(startSaveNote(activeNote));
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
  Swal.close();
};

export const startDeleteNote = (id) => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const url = `${uid}/journal/notes/${id}`;
  await db.doc(url).delete();
  dispatch(deleteNote(id));
};

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

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

const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesCleaning = () => ({
  type: types.notesLogoutCleaning,
});
