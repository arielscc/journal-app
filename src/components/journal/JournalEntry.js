import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ note }) => {
  const { body, title, date, url } = note;

  const dayLitteral = format(new Date(date), 'eeee', { locale: es });
  const dayNumber = format(new Date(date), 'dd');

  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(activeNote(null, note));
  };
  return (
    <div className="journal__entry pointer" onClick={handleActiveNote}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="jornal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="jorunal__entry-date-box">
        <span style={{ textTransform: 'capitalize' }}>{dayLitteral}</span>
        <h4>{dayNumber}</h4>
      </div>
    </div>
  );
};
