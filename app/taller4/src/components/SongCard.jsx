import React from 'react';

const SongCard = ({ title, duration }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg rounded-lg overflow-hidden w-full sm:w-96 flex items-center">
      <img
        src="https://cdn.icon-icons.com/icons2/390/PNG/512/compact-disc_38539.png"
        alt="Imagen del artista"
        className="w-32 h-32 rounded-full mr-4"
      />
      <div>
        <div className="flex flex-col">
          <div className="flex items-start">
            <p className="text-lg font-bold break-words text-left">Canción: {title}</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">Duración: {duration}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SongCard;







