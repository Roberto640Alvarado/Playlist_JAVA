import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Playlist = (props) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Obtener el código de la playlist
  const getCode = () => {
    setCode(props.code);
    navigate(`/playlist/${props.code}`);
  }

  const handleAddSong = () => {
    navigate('/allsongs');

  }


  return (
    <div className="flex items-center justify-center">
      <div className="w-64 bg-purple-100 rounded-lg overflow-hidden shadow-lg mx-4 my-8">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{props.title}</h2>
          <p className="text-sm text-gray-600 mb-4">Descripción: {props.description}</p>
          <div className="flex justify-center mt-4">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddSong}>
              Agregar canciones
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={getCode}>
              Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
