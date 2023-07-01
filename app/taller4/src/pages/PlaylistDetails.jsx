import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongCard from '../components/SongCard';
import SongxPlaylistServices from '../services/SongxPlaylistServices';
import context from '../context/UserContext';

const PlaylistDetails = () => {
  const { code } = useParams();
  const [playlist, setPlaylist] = useState(null);

  console.log('code: ' + code);

  useEffect(() => {
    fetchPlaylistDetails();
  }, []);

  const fetchPlaylistDetails = async () => {
    let token = context.getToken();
    let response = await SongxPlaylistServices.findAllSongByPlaylist(token, code);
    console.log(response);

    if (!response.error) {
      let data = response;
      setPlaylist(data);
    }
  };

  if (!playlist) {
    return <div>Cargando...</div>;
  }

  const { playlist: playlistData, songs } = playlist;
  const playlistTitle = playlistData ? playlistData.title : '';
  const playlistDescription = playlistData ? playlistData.description : '';

  return (
    <div>
      <h1 className="text-3xl font-bold m-4">Playlist {playlistTitle}</h1>
      <p className="text-sm text-gray-600 mb-4">Descripción: {playlistDescription}</p>
      <p className="text-sm text-gray-600 mb-4">Total de reproducción: {playlist.total}</p>

      <h2 className="text-lg font-bold mb-2">Canciones:</h2>
      {songs && songs.length > 0 ? (
        <ul className="space-y-4">
          <div className='grid grid-cols-3 px-32 gap-10 mt-8'>
            {songs.map((song) => (
              <li key={song.title}>
                <SongCard title={song.title} duration={song.duration} />
              </li>
            ))}
          </div>
        </ul>
      ) : (
        <p className="text-gray-600">No hay canciones en esta playlist.</p>
      )}
    </div>
  );
};

export default PlaylistDetails;
