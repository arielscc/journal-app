import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://i.pinimg.com/originals/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="jornal__entry-title">un nuevo parrafo</p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odio,
          libero earum maiores accusamus sed
        </p>
      </div>

      <div className="jorunal__entry-date-box">
        <span>Moday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
