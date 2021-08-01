import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutFirebase } from '../../actions/auth';
import { addOneNewNote, notesCleaning } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutFirebase());
    history.push('/auth/login');
    dispatch(notesCleaning());
  };

  const addNewNote = () => {
    dispatch(addOneNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3>{name}</h3>
        <button className="btn" onClick={handleLogout}>
          Logout
          <i className="fas fa-sign-out-alt" style={{ marginLeft: '.5rem' }} />
        </button>
      </div>
      <div className="journal__new-entry" onClick={addNewNote}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">new entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
