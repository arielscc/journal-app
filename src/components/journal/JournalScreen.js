import React from 'react';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>
        <p>Main Content</p>
      </main>
    </div>
  );
};
