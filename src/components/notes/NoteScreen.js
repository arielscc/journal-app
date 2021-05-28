import React from 'react';
import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppbar />
      <div className="note__content">
        <input type="text" placeholder="Sole awesome title" className="notes__title-input" autoComplete="off" />
        <textarea placeholder="what happend today" className="notes__textarea"></textarea>
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
