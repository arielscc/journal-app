import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm(note);
  const { title, body, url, id } = values;
  const noteID = useRef(note.id);
  useEffect(() => {
    if (noteID.current !== note.id) {
      reset(note);
      noteID.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);
  const handleDelete = () => {
    dispatch(startDeleteNote(noteID.current));
  };
  return (
    <div className="notes__main-content">
      <NotesAppbar />
      <div className="note__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="what happend today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {url && (
          <div className="notes__image">
            <img src={url} alt="Paisaje bonito" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        delete note
      </button>
    </div>
  );
};
