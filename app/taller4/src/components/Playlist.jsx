import React from 'react';
import SongCard from '../components/SongCard';

const Playlist = () => {
  const songs = [];

  const playlistName = "Favoritas";
  const creator = "Juan Perez";
  const description = "Canciones favoritas de Juan Perez";

  return (
    <div className="flex flex-col items-center">
      
      
      <div id="play" className="bg-purple-100 p-4 rounded-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{playlistName}</h2>
          <p className="text-lg">Creado por: {creator}</p>
          <p className="text-lg">Descripcion : {description}</p>
        </div>
        <div>
          {songs.map(song => (
            <div key={song.id} className="mb-4">
              <SongCard
                title={song.title}
                duration={song.duration}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;