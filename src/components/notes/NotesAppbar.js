import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadImage } from '../../actions/notes';

export const NotesAppbar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handleSelectImage = () => {
    document.getElementById('inputfile').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadImage(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>23 de marzo de 2020</span>
      <input
        id="inputfile"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handleSelectImage}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
