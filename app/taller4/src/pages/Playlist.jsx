import React from 'react';
import SongCard from '../components/SongCard';

const Playlist = () => {
  const songs = [
    {
      id: 1,
      title: "Fly me to the moon",
      duration: "2:20"
    },
    {
      id: 2,
      title: "Bohemian Rhapsody",
      duration: "5:55"
    },
    {
      id: 3,
      title: "Hotel California",
      duration: "6:30"
    }
    // Agrega más canciones aquí
  ];

  const playlistName = "Favoritas";
  const creator = "Juan Perez";
  const description = "Canciones favoritas de Juan Perez";

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Playlist</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar canciones"
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
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
