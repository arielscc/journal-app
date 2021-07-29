import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm(note);
  const { title, body } = values;
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

        <div className="notes__image">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.turismodeobservacion.com%2Fmedia%2Ffotografias%2Fpaisaje-natural-en-sajambre-42863-xl.jpg&f=1&nofb=1"
            alt="Paisaje bonito"
          />
        </div>
      </div>
    </div>
  );
};
