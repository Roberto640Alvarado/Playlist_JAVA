import React from 'react';
import Playlist from '../components/Playlist';

const AllPlaylist = () => {
  
  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Todas las Playlist</h1>
    <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar canciones"
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
    <Playlist/>
    </div>
    
  );
};

export default AllPlaylist;
