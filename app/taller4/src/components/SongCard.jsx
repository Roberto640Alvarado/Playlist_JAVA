import React, { useState, useEffect } from 'react';

const SongCard = (props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);

  useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);

  const handleSelect = () => {
    setIsSelected((prevIsSelected) => !prevIsSelected);
    props.onSelect(props.code);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg rounded-lg overflow-hidden w-full sm:w-96 flex items-center">
      <img
        src="https://cdn.icon-icons.com/icons2/390/PNG/512/compact-disc_38539.png"
        alt="Imagen del artista"
        className="w-32 h-32 rounded-full mr-4"
      />
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold break-words text-left">Canción: {props.title}</p>
          <div className='px-6'>
            <input type="checkbox" className="w-8 h-8" checked={isSelected} onChange={handleSelect} />
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-bold">Duración: {props.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;


